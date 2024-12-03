export default function Table(data: Array<Record<string, string | number>>) {
    const keys = Object.keys(data[0]).sort((a) => a === 'id' ? -1 : 1);

    return (
        <table>
            <thead>
                <tr>
                    {keys.map((key) => <th key={key}>{key}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        {keys.map((key) => <td key={key}>{row[key]}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}