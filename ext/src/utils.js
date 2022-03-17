export const generateExportTitle = () => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return `RapidRecruit Results ${formattedDate}`;
}