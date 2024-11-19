import { NavLink } from "react-router-dom";
import Logo from "../assets/images/TaskHive_Black.png";
import Dark_Mode from "./Dark_Mode";

export default function Admin_Navbar() {
	return (
		<nav className="navbar">
            <img src={ Logo } alt="Logo" />
			<ul>
				<li>
					<NavLink to="/cadastrar-task" activeClassName="active-link">
						Tarefas
					</NavLink>
				</li>
				<li>
					<NavLink to="/admin-gerenciar-user" activeClassName="active-link">
						Usuários
					</NavLink>
				</li>
			</ul>
            <Dark_Mode />
		</nav>
	);
};