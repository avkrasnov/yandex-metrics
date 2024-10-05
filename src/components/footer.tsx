import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            By <Link to="https://github.com/avkrasnov/yandex-metrics" target="_blank">Andrei Krasnov</Link>{' '}
            <a href="mailto:krasnyi5@rambler.ru">krasnyi5@rambler.ru</a>{' '}
            &copy; 2024
        </div>
    );
}

export default Footer;