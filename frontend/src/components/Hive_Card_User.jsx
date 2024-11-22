export default function Hive_Card_User() {
	const HexCard = ({ usuario }) => {
		return (
			<div className="hex">
				<div className="hex-inner">
					<div className="hex-content">
						<p><strong>{usuario}</strong></p>
					</div>
				</div>
			</div>
		);
	};	
}