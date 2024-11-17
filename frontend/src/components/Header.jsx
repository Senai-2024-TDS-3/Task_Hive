import Logo from "../assets/images/TaskHive_Black.png";
import Dark_Mode from "./Dark_Mode";

export default function Header() {
    return (
        <div className="header">
            <img src={ Logo } alt="Logo" />
            <h1>Task Hive</h1>
            <Dark_Mode />
        </div>
    )
}