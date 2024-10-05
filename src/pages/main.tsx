import { Button, Spin, Table } from "antd";
import { useMetrics } from "../redux/reducers";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/lib/table/interface";

type TableItem = {
    url: string;
    visits: number;
    users: number;
}

const Main = () => {
    const { metrics, isFetching } = useMetrics();

    const items = metrics.map((metric) => ({ url: metric.dimensions[1].name, visits: metric.metrics[0], users: metric.metrics[1] })) as TableItem[];

    const renderName = (metric: TableItem) => {
        return <Link to={metric.url} target="_blank">{metric.url}</Link>
    }

    const stringSorter = (a: string, b: string) => {
        return a > b ? 1 : a < b ? -1 : 0;
    };

    const numberSorter = (a: number, b: number) => {
        return a - b;
    };
    

    const nameSorter = (a: TableItem, b: TableItem) => {
        return stringSorter(a.url.toLowerCase(), b.url.toLowerCase());
    };

    const visitsSorter = (a: TableItem, b: TableItem) => {
        return numberSorter(a.visits, b.visits);
    };

    const usersSorter = (a: TableItem, b: TableItem) => {
        return numberSorter(a.users, b.users);
    };

    const columns = [
        {
            title: 'URL',
            render: renderName,
            key: 'url',
            sorter: nameSorter,
            showSorterTooltip: false,
        },
        {
            title: 'Визиты',
            dataIndex: 'visits',
            key: 'visits',
            sorter: visitsSorter,
            showSorterTooltip: false,
        },
        {
            title: 'Посетители',
            dataIndex: 'users',
            key: 'users',
            sorter: usersSorter,
            showSorterTooltip: false,
        },
    ] as ColumnsType<object>;

    const exportData = () => {
        const rows = [
            ['URL', 'Visits', 'Users'],
            ...items.map(item => [item.url, item.visits, item.users]),
        ];
        
        const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(';')).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'Отчёт.csv');
        document.body.appendChild(link);
        link.click();
        link.parentElement?.removeChild(link);
    }

    return (
        <Spin spinning={isFetching}>
            <Table dataSource={items} columns={columns} />
            <div className="table-actions">
                <Button
                    disabled={items.length === 0}
                    onClick={exportData}
                >
                    Экспорт в CSV
                </Button>
            </div>
        </Spin>
    );
}

export default Main;