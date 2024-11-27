import Hex_Cell_User from "./Hex_Cell_User"
import Hive_Card_User from "./Hive_card_User"

export default function Hive_Layout_Users() {
    return (
        <>
            <div className="Hex_Layout_Tasks">
                {/* NUMERO MÁXIMO = 7 */}
                <div className="layout_left">
                    <Hex_Cell_User />
                    <Hex_Cell_User />
                    <Hex_Cell_User/>
                    <Hex_Cell_User />
                    <Hex_Cell_User />
                    <Hex_Cell_User />
                    <Hex_Cell_User/>
                </div>
                <div className="layout_right">
                    <Hex_Cell_User />
                    <Hex_Cell_User />
                    <Hex_Cell_User />
                    <Hex_Cell_User/>
                    <Hex_Cell_User />
                    <Hex_Cell_User/>
                    <Hex_Cell_User/>
                </div>
            </div>
        </>
    )
}