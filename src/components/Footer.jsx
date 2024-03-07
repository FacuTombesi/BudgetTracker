export default function Footer() {
  return (
    <footer className="d-flex flex-column align-items-center justify-content-center mt-3">
      <p className="text-black" style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif", fontSize: "0.65rem" }}>Budget Tracker developed with React, JavaScript, HTML and Bootstrap.</p>
      <div className="d-flex flex-row align-items-center justify-content-center">
        <a href="https://github.com/FacuTombesi/WeatherApp" target="_blank" rel="noreferrer">
          <img
            src="./img/iconGITHUB(black).png"
            alt="GitHub Repository"
            loading="lazy"
            style={{ height: "1.5rem", margin: "2px 5px" }}
            onMouseOver={(e) => {e.currentTarget.src = "./img/iconGITHUB(pink).png"}}
            onMouseOut={(e) => {e.currentTarget.src = "./img/iconGITHUB(black).png"}}
          />
        </a>
        <a href="https://www.linkedin.com/in/facundotombesi/" target="_blank" rel="noreferrer">
          <img
            src="./img/iconLINKEDIN(black).png"
            alt="LinkedIn"
            loading="lazy"
            style={{ height: "1.5rem", margin: "2px 5px" }}
            onMouseOver={(e) => {e.currentTarget.src = "./img/iconLINKEDIN(pink).png"}}
            onMouseOut={(e) => {e.currentTarget.src = "./img/iconLINKEDIN(black).png"}}
          />
        </a>
      </div>
      <a href="https://ftportfolio.vercel.app/" target="_blank" rel="noreferrer">
        <img src="./img/logo(base)_NEW.png" alt="Facundo Tombesi" loading="lazy" style={{ height: "2.4rem" }} />
      </a>
    </footer>
  )
}