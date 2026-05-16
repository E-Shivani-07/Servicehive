import { Parser } from 'json2csv';

export const generateCsv = (data: any[], fields: string[]) => {
  const json2csvParser = new Parser({ fields });
  return json2csvParser.parse(data);
};
