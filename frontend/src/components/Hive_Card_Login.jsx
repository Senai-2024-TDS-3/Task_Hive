import './Hive_Card_Login.css'

export default function Hive_Card_Login() {
    return (
        <div className="hex-grid">
            <div className="hex">
                <label htmlFor="hex-1">Email:</label>
                <input type="text" />
                <label htmlFor="hex-2">Senha:</label>
                <input type="password" />
                <br />
                <button type="submit">Entrar</button>
                <br />
                <div className="hex_links">
                    <p>Esqueci minha senha</p>
                    <p>Cadastrar</p>
                </div>
            </div>
        </div>
    )
}