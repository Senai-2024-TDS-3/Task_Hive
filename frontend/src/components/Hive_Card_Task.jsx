export default function Hive_Card_Task() {
	const HexCard = ({ usuario, tarefa, prazo }) => {
		return (
			<div className="hex">
				<div className="hex-inner">
					<div className="hex-content">
						<p><strong>{usuario}</strong></p>
						<p>{tarefa}</p>
						<p>{prazo}</p>
					</div>
				</div>
			</div>
		);
	};	
}