import Hex_Cell_User from "../Hex_Cell_User"
import Hex_Teste from "../Hex_Teste"


export default function Hive_Layout_Users() {
    return (
        <>
            <div className="Hex_Layout_User">
                {/* NUMERO MÁXIMO = 7 */}
                <div  id="divtask" >
                  1 <Hex_Cell_User/>
                  2 <Hex_Cell_User/>
                   3 <Hex_Cell_User/>
                   4 <Hex_Cell_User/>
                  5  <Hex_Cell_User/>
                  6  <Hex_Cell_User/>
                 7  <Hex_Cell_User/>
                </div>
            </div>
        </>
    )
}