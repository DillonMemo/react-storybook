export const data = [
  {
    id: 1,
    name: "A1",
    surname: "B",
    isMarried: true,
    birthDate: new Date(1987, 1, 1),
    birthCity: 0,
    sex: "Male",
    type: "adult",
    insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    time: new Date(1900, 1, 1, 14, 23, 35)
  },
  {
    id: 2,
    name: "A2",
    surname: "B",
    isMarried: false,
    birthDate: new Date(1987, 1, 1),
    birthCity: 34,
    sex: "Female",
    type: "adult",
    insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    time: new Date(1900, 1, 1, 14, 23, 35),
    parentId: 1
  },
  {
    id: 3,
    name: "A3",
    surname: "B",
    isMarried: true,
    birthDate: new Date(1987, 1, 1),
    birthCity: 34,
    sex: "Female",
    type: "child",
    insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    time: new Date(1900, 1, 1, 14, 23, 35),
    parentId: 1
  },
  {
    id: 4,
    name: "A4",
    surname: "Dede",
    isMarried: true,
    birthDate: new Date(1987, 1, 1),
    birthCity: 34,
    sex: "Female",
    type: "child",
    insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    time: new Date(1900, 1, 1, 14, 23, 35),
    parentId: 3
  },
  {
    id: 5,
    name: "A5",
    surname: "C",
    isMarried: false,
    birthDate: new Date(1987, 1, 1),
    birthCity: 34,
    sex: "Female",
    type: "child",
    insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    time: new Date(1900, 1, 1, 14, 23, 35)
  },
  {
    id: 6,
    name: "A6",
    surname: "C",
    isMarried: true,
    birthDate: new Date(1989, 1, 1),
    birthCity: 34,
    sex: "Female",
    type: "child",
    insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    time: new Date(1900, 1, 1, 14, 23, 35),
    parentId: 5
  }
];

export const columns = [
  { title: "Adı", field: "name" },
  { title: "Soyadı", field: "surname" },
  { title: "Evli", field: "isMarried", type: "boolean" },
  { title: "Cinsiyet", field: "sex" },
  { title: "Tipi", field: "type" },
  { title: "Doğum Yılı", field: "birthDate", type: "date" },
  {
    title: "Doğum Yeri",
    field: "birthCity"
  },
  { title: "Kayıt Tarihi", field: "insertDateTime", type: "datetime" },
  { title: "Zaman", field: "time", type: "time" }
];

// export const columns = [
//   { title: "Adı", field: "name", filterPlaceholder: "Adı filter" },
//   { title: "Soyadı", field: "surname", initialEditValue: "test" },
//   { title: "Evli", field: "isMarried", type: "boolean" },
//   { title: "Cinsiyet", field: "sex", disableClick: true, editable: "onAdd" },
//   { title: "Tipi", field: "type", removable: false, editable: "never" },
//   { title: "Doğum Yılı", field: "birthDate", type: "date" },
//   {
//     title: "Doğum Yeri",
//     field: "birthCity",
//     lookup: { 34: "İstanbul", 0: "Şanlıurfa" }
//   },
//   { title: "Kayıt Tarihi", field: "insertDateTime", type: "datetime" },
//   { title: "Zaman", field: "time", type: "time" }
// ];
