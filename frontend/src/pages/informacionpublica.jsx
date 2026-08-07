import React, { useState, useEffect, useRef } from "react";
import "./informacionpublica.css";

const WP_API = "https://contralorbariloche.gob.ar/wp-json/wp/v2";

const SECCIONES = [
  { label: "Resoluciones", endpoint: "resoluciones" },
  { label: "Sentencias", endpoint: "sentencias" },
  { label: "Informes", endpoint: "informes" },
  { label: "Estados Contables", endpoint: "estados-contables" },
];

const AÑOS = Array.from({ length: 2026 - 2008 + 1 }, (_, i) => 2026 - i);
const POR_PAGINA = 20;
const MAX_HISTORIAL = 6;

export default function InformacionPublica() {
  const [seccion, setSeccion] = useState(SECCIONES[0]);
  const [anio, setAnio] = useState(2026);
  const [inputBusqueda, setInputBusqueda] = useState("");
  const [busquedaActiva, setBusquedaActiva] = useState("");
  const [historial, setHistorial] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("busqueda_historial")) || [];
    } catch {
      return [];
    }
  });
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [documentos, setDocumentos] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const busquedaRef = useRef(null);

  // Resetear página al cambiar filtros
  useEffect(() => {
    setPagina(1);
  }, [seccion, anio, busquedaActiva]);

  // Fetch documentos
  useEffect(() => {
    const fetchDocumentos = async () => {
      setCargando(true);
      setError(null);
      try {
        let url = `${WP_API}/${seccion.endpoint}?acf_format=standard&per_page=${POR_PAGINA}&page=${pagina}&meta_key=anio&meta_value=${anio}&orderby=title&order=asc`;
        if (busquedaActiva) url += `&search=${encodeURIComponent(busquedaActiva)}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al obtener documentos");
        setTotal(Number(res.headers.get("X-WP-Total")) || 0);
        setDocumentos(await res.json());
      } catch {
        setError("No se pudieron cargar los documentos. Intentá de nuevo.");
        setDocumentos([]);
      } finally {
        setCargando(false);
      }
    };
    fetchDocumentos();
  }, [seccion, anio, busquedaActiva, pagina]);

  // Cerrar historial al click afuera
  useEffect(() => {
    const handleClick = (e) => {
      if (busquedaRef.current && !busquedaRef.current.contains(e.target)) {
        setMostrarHistorial(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const guardarHistorial = (termino) => {
    if (!termino.trim()) return;
    const nuevo = [termino, ...historial.filter((h) => h !== termino)].slice(0, MAX_HISTORIAL);
    setHistorial(nuevo);
    localStorage.setItem("busqueda_historial", JSON.stringify(nuevo));
  };

  const handleBuscar = () => {
    const termino = inputBusqueda.trim();
    guardarHistorial(termino);
    setBusquedaActiva(termino);
    setInputBusqueda("");
    setMostrarHistorial(false);
  };

  const handleHistorialClick = (termino) => {
    guardarHistorial(termino);
    setBusquedaActiva(termino);
    setInputBusqueda("");
    setMostrarHistorial(false);
  };

  const handleLimpiarBusqueda = () => {
    setBusquedaActiva("");
    setInputBusqueda("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleBuscar();
    if (e.key === "Escape") setMostrarHistorial(false);
  };

  const totalPaginas = Math.ceil(total / POR_PAGINA);

  return (
    <main className="infpub block-start">
      <div className="container">

        <header className="infpub__header">
          <h1 className="infpub__titulo uppercase">Información Pública</h1>
          <p className="infpub__subtitulo">
            Accedé a los documentos oficiales del Tribunal Contralor de San Carlos de Bariloche.
          </p>
        </header>

        <div className="infpub__filtros">
          <div className="infpub__secciones">
            {SECCIONES.map((s) => (
              <button
                key={s.endpoint}
                className={`infpub__seccion-btn ${seccion.endpoint === s.endpoint ? "activo" : ""}`}
                onClick={() => { setSeccion(s); handleLimpiarBusqueda(); }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="infpub__anio-wrapper">
            <label className="infpub__anio-label" htmlFor="selector-anio">Año</label>
            <select
              id="selector-anio"
              className="infpub__anio-select"
              value={anio}
              onChange={(e) => setAnio(Number(e.target.value))}
            >
              {AÑOS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* BUSCADOR */}
        <div className="infpub__buscador-wrapper" ref={busquedaRef}>
          <div className="infpub__buscador">
            <input
              type="text"
              className="infpub__buscador-input"
              placeholder="Buscar por nombre..."
              value={inputBusqueda}
              onChange={(e) => setInputBusqueda(e.target.value)}
              onFocus={() => setMostrarHistorial(historial.length > 0)}
              onKeyDown={handleKeyDown}
            />
            <button className="infpub__buscador-btn" onClick={handleBuscar}>
              Buscar
            </button>
          </div>

          {/* HISTORIAL */}
          {mostrarHistorial && historial.length > 0 && (
            <ul className="infpub__historial">
              {historial.map((termino, i) => (
                <li
                  key={i}
                  className="infpub__historial-item"
                  onClick={() => handleHistorialClick(termino)}
                >
                  <span className="infpub__historial-icono">↺</span>
                  {termino}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* BÚSQUEDA ACTIVA */}
        {busquedaActiva && (
          <div className="infpub__busqueda-activa">
            <span>Buscando: <strong>"{busquedaActiva}"</strong></span>
            <button className="infpub__limpiar-btn" onClick={handleLimpiarBusqueda}>
              ✕ Limpiar búsqueda
            </button>
          </div>
        )}

        <div className="infpub__resultados-info">
          {!cargando && !error && (
            <span>{total} documento{total !== 1 ? "s" : ""} encontrado{total !== 1 ? "s" : ""} en {seccion.label} — {anio}</span>
          )}
        </div>

        <div className="infpub__lista-wrapper">
          {cargando && (
            <div className="infpub__estado">
              <div className="infpub__spinner" />
              <span>Cargando documentos...</span>
            </div>
          )}

          {error && !cargando && (
            <div className="infpub__estado infpub__estado--error">
              <span>{error}</span>
            </div>
          )}

          {!cargando && !error && documentos.length === 0 && (
            <div className="infpub__estado">
              <span>No hay documentos disponibles para {seccion.label} en {anio}{busquedaActiva ? ` con "${busquedaActiva}"` : ""}.</span>
            </div>
          )}

          {!cargando && !error && documentos.length > 0 && (
            <ul className="infpub__lista">
              {documentos.map((doc) => (
                <li key={doc.id} className="infpub__item">
                  <a
                    href={doc.acf?.archivo_pdf || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="infpub__link"
                  >
                    <span className="infpub__icono">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </span>
                    <span className="infpub__nombre">{doc.title?.rendered}</span>
                    <span className="infpub__descargar">Ver PDF →</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {totalPaginas > 1 && !cargando && (
          <div className="infpub__paginacion">
            <button
              className="infpub__pag-btn"
              onClick={() => setPagina((p) => Math.max(p - 1, 1))}
              disabled={pagina === 1}
            >
              ← Anterior
            </button>
            <span className="infpub__pag-info">Página {pagina} de {totalPaginas}</span>
            <button
              className="infpub__pag-btn"
              onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas))}
              disabled={pagina === totalPaginas}
            >
              Siguiente →
            </button>
          </div>
        )}

      </div>
    </main>
  );
}