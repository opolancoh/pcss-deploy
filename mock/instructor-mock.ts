// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import moment from 'moment';
import { parse } from 'url';

// const apiModel = API.InstructorListItem
const tipoVinculaciones = ['Planta', 'Contratista', 'Externo'];

function generateItem(index: number): API.InstructorListItem {
  return {
    key: index ? index : 0,
    nombrePersona: `Instructor ${index}`,
    tipoVinculacion: tipoVinculaciones[Math.floor(Math.random() * (tipoVinculaciones.length))],
    totalHorasMes: Math.floor(Math.random() * (1000 + 1)),
    fechaInicioContrato: moment(
      new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    ).format('YYYY-MM-DD'),
    fechaFinContrato: moment(
      new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
    ).format('YYYY-MM-DD'),
    coordinador: `Coordinador ${Math.floor(Math.random() * (6 + 1))}`,
    areaDeConocimiento: `Area ${Math.floor(Math.random() * (11 + 1))}`,
    resultadoDeAprendizaje: `Resultado ${Math.floor(Math.random() * (21 + 1))}`,
  };
}

// mock tableListDataSource
const generateList = (current: number, pageSize: number) => {
  const tableListDataSource: API.InstructorListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push(generateItem(index));
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = generateList(1, 100);

function getItems(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.InstructorListItem & {
      sorter: any;
      filter: any;
    };

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const sorter = JSON.parse(params.sorter || ('{}' as any));
  if (sorter) {
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.nombrePersona) {
    dataSource = dataSource.filter((data) =>
      data?.nombrePersona?.includes(params.nombrePersona || ''),
    );
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postItem(req: Request, res: Response, u: string, b: Request) {
  console.log('postItem')
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newItem: API.InstructorListItem = generateItem(i);
        tableListDataSource.unshift(newItem);
        console.log('tableListDataSource', tableListDataSource);
        console.log('newItem', newItem);
        return res.json(newItem);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/instructors': getItems,
  'POST /api/instructors': postItem,
};
