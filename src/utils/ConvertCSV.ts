/**
 * @since 2019.09.26
 * @description - CSV파일을 JSON 형태로 변환 해주는 유틸 이벤트 입니다.
 * @param file - JSON 파일로 변환할 CSV 파일
 */
export const CsvToJson = (file: string): any => {
  const lines = file.split("\n");

  const result = [];

  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  const resultString = JSON.stringify(result);
  return resultString;
};
