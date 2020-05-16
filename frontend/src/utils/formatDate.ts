const formatDate = (value: string): string => {
  const dateTimeFormat = new Intl.DateTimeFormat('pt-BR').format(Date.parse(value));
  return dateTimeFormat;
}
export default formatDate;
