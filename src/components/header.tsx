import { Button, Checkbox, CheckboxProps, DatePicker, Flex, Input, message } from "antd";
import { FormEventHandler, useState } from "react";
import dayjs from 'dayjs';
import moment from 'moment';
import { RangePickerProps } from "antd/es/date-picker";
import { useYandex } from "../redux/reducers";
import { useDispatch } from "react-redux";
import { IAction, setMetrics, setMetricsFetching, setYandex } from "../redux/actions";
import { Dispatch } from "redux";
import { useLazyGetMetricsQuery } from "../redux/api";
import { QueryStatus } from "@reduxjs/toolkit/query";

const { RangePicker } = DatePicker;

const Header = () => {
    const YaCounterId = useYandex().counterId;

    const [dateFrom, setDateFrom] = useState<Date|null>(moment().subtract(3, 'months').toDate());

    const [dateTo, setDateTo] = useState<Date|null>(new Date());

    const [withoutRobots, setWithoutRobots] = useState(true);

    const dispatch = useDispatch<Dispatch<IAction>>();

    const [getMetrics] = useLazyGetMetricsQuery();

    const [messageApi, contextHolder] = message.useMessage();

    const inputHandler: FormEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.currentTarget;
        dispatch(setYandex({ counterId: value }));
        localStorage.setItem('YaCounterId', value);
    }

    const dateChangeHandler: RangePickerProps['onChange'] = (dates) => {
        const [dateFrom, dateTo] = dates || [];
        setDateFrom(dateFrom?.toDate() || null);
        setDateTo(dateTo?.toDate() || null);
    };

    const checkboxHandler: CheckboxProps['onChange'] = (event) => {
        const { checked } = event.target;

        setWithoutRobots(checked);
    };

    const loadData = async () => {
        if (!dateFrom || !dateTo) return;

        dispatch(setMetricsFetching(true));

        const metrics = await getMetrics({ dateFrom, dateTo, yandexCounterId: YaCounterId, withoutRobots });

        if (metrics.status === QueryStatus.fulfilled) {
            dispatch(setMetrics(metrics.data.data));
        } else {
            dispatch(setMetrics([]));
            messageApi.error('Не удалось загрузить данные!');
        }

        dispatch(setMetricsFetching(false));
    }

    return (
        <div className="header">
            {contextHolder}
            <Flex className="header-wrap">
                <Input
                    onInput={inputHandler}
                    value={YaCounterId}
                    placeholder="ID счётчика Яндекс.Метрики"
                />
                <RangePicker
                    className="rangepicker"
                    onChange={dateChangeHandler}
                    defaultValue={[dayjs(dateFrom), dayjs(dateTo)]}
                    format="DD.MM.YYYY"
                />
                <Checkbox className="robots" onChange={checkboxHandler} defaultChecked={withoutRobots}>Без роботов</Checkbox>
                <Button
                    disabled={!dateTo || !dateFrom}
                    onClick={loadData}
                >Загрузить</Button>
            </Flex>
        </div>
    );
}

export default Header;