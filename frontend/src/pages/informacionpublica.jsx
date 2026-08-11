import React, { useState, useEffect, useRef } from "react";
import "./informacionpublica.css";

const WP_API = "https://contralorbariloche.gob.ar/wp-json/wp/v2";

const SECTIONS = [
  { label: "Resoluciones", endpoint: "resoluciones" },
  { label: "Sentencias", endpoint: "sentencias" },
  { label: "Informes", endpoint: "informes" },
  { label: "Estados Contables", endpoint: "estados-contables" },
];

const YEARS = Array.from({ length: 2026 - 2008 + 1 }, (_, i) => 2026 - i);
const PER_PAGE = 20;
const MAX_HISTORY = 6;

export default function InformacionPublica() {
  const [section, setSection] = useState(SECTIONS[0]);
  const [year, setYear] = useState(2026);
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("search_history")) || [];
    } catch {
      return [];
    }
  });
  const [showHistory, setShowHistory] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [section, year, activeSearch]);

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${WP_API}/${section.endpoint}?acf_format=standard&per_page=${PER_PAGE}&page=${page}&orderby=title&order=asc`;

        if (activeSearch) {
          url += `&search=${encodeURIComponent(activeSearch)}`;
        } else {
          url += `&meta_key=anio&meta_value=${year}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Error fetching documents");
        setTotal(Number(res.headers.get("X-WP-Total")) || 0);
        setDocuments(await res.json());
      } catch {
        setError("No se pudieron cargar los documentos. Intentá de nuevo.");
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [section, year, activeSearch, page]);

  // Close history on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveHistory = (term) => {
    if (!term.trim()) return;
    const updated = [term, ...history.filter((h) => h !== term)].slice(0, MAX_HISTORY);
    setHistory(updated);
    localStorage.setItem("search_history", JSON.stringify(updated));
  };

  const handleSearch = () => {
    const term = searchInput.trim();
    saveHistory(term);
    setActiveSearch(term);
    setSearchInput("");
    setShowHistory(false);
  };

  const handleHistoryClick = (term) => {
    saveHistory(term);
    setActiveSearch(term);
    setSearchInput("");
    setShowHistory(false);
  };

  const handleClearSearch = () => {
    setActiveSearch("");
    setSearchInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") setShowHistory(false);
  };

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <section className="infpub-section container block-start">

      <div className="infpub-wrapper">
        <div className="infpub-title">
          <h3>Información Pública</h3>
          <p>Accedé a los documentos oficiales del Tribunal Contralor de San Carlos de Bariloche.</p>
        </div>

        <div className="infpub-filter">
          <div className="infpub-sections">
            {SECTIONS.map((s) => (
              <button
                key={s.endpoint}
                className={`infpub-section-btn ${section.endpoint === s.endpoint ? "active" : ""}`}
                onClick={() => { setSection(s); handleClearSearch(); }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="infpub-year-wrapper">
            <label className="infpub-year-label" htmlFor="selector-year">Año</label>
            <select
              id="selector-year"
              className="infpub-year-select"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="infpub-searcher-wrapper" ref={searchRef}>
        <div className="infpub-searcher">
          <input
            type="text"
            className="infpub-searcher-input"
            placeholder="Buscar por nombre..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setShowHistory(history.length > 0)}
            onKeyDown={handleKeyDown}
          />
          <button className="infpub-searcher-btn" onClick={handleSearch}>
            Buscar
          </button>
        </div>

        {/* HISTORY */}
        {showHistory && history.length > 0 && (
          <ul className="infpub-history">
            {history.map((term, i) => (
              <li
                key={i}
                className="infpub-history-item"
                onClick={() => handleHistoryClick(term)}
              >
                <span className="infpub-history-icon">↺</span>
                {term}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ACTIVE SEARCH TAG */}
      {activeSearch && (
        <div className="infpub-search-active">
          <span>Buscando: <strong>"{activeSearch}"</strong></span>
          <button className="infpub-clear-btn" onClick={handleClearSearch}>
            ✕ Limpiar búsqueda
          </button>
        </div>
      )}

      <div className="infpub-results-info">
        {!loading && !error && (
          <span>
            {total} documento{total !== 1 ? "s" : ""} encontrado{total !== 1 ? "s" : ""} en {section.label}{activeSearch ? ` — "${activeSearch}"` : ` — ${year}`}
          </span>
        )}
      </div>

      <div className="infpub-list-wrapper">
        {loading && (
          <div className="infpub-state">
            <div className="infpub-spinner" />
            <span>Cargando documentos...</span>
          </div>
        )}

        {error && !loading && (
          <div className="infpub-state infpub-state-error">
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && documents.length === 0 && (
          <div className="infpub-state">
            <span>
              No hay documentos disponibles para {section.label}{activeSearch ? ` con "${activeSearch}"` : ` en ${year}`}.
            </span>
          </div>
        )}

        {!loading && !error && documents.length > 0 && (
          <ul className="infpub-list">
            {documents.map((doc) => (
              <li key={doc.id} className="infpub-item">
                <a
                  href={doc.acf?.archivo_pdf || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="infpub-link"
                >
                  <span className="infpub-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </span>
                  <span className="infpub-name">{doc.title?.rendered}</span>
                  <span className="infpub-download">Ver PDF →</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {totalPages > 1 && !loading && (
        <div className="infpub-pagination">
          <button
            className="infpub-page-btn"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            ← Anterior
          </button>
          <span className="infpub-page-info">Página {page} de {totalPages}</span>
          <button
            className="infpub-page-btn"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Siguiente →
          </button>
        </div>
      )}

    </section>
  );
}