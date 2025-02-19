export default function convertToTable(data) {
    // console.log('datta',data)
    data = JSON.parse(data);
    if (!Array.isArray(data) || data.length === 0) {
        return "Invalid data format. Expected an array of objects.";
    }

    const headers = Array.from(new Set(data.flatMap(Object.keys)));
    const columnWidths = headers.map(header =>
        Math.max(header.length, ...data.map(row => String(row[header] ?? '').length))
    );

    const createRow = (row) => '| ' + row.map((cell, i) => (cell ?? '').toString().padEnd(columnWidths[i])).join(' | ') + ' |';
    const separator = '+-' + columnWidths.map(width => '-'.repeat(width)).join('-+-') + '-+';

    const table = [
        separator,
        createRow(headers),
        separator,
        ...data.map(row => createRow(headers.map(header => row[header] ?? ''))),
        separator
    ];

    return table.join('\n');
}

