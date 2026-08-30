import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./novedades.css";

const WP_API = import.meta.env.VITE_WP_API;
const PER_PAGE = 9;

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const stripHtml = (html) => html.replace(/<[^>]*>/g, "");

export default function Novedades() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${WP_API}/posts?_embed&per_page=${PER_PAGE}&page=${page}&orderby=date&order=desc`
        );
        if (!res.ok) throw new Error("Error al obtener novedades");
        setTotal(Number(res.headers.get("X-WP-Total")) || 0);
        setPosts(await res.json());
      } catch {
        setError("No se pudieron cargar las novedades. Intentá de nuevo.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  const totalPages = Math.ceil(total / PER_PAGE);

  const getImage = (post) => {
    return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
  };

  return (
    <section className="novedades-section block-start container">
        <div className="novedades-title">
          <h3>Novedades</h3>
          <p>
            Últimas noticias y comunicados del Tribunal Contralor de San Carlos de Bariloche.
          </p>
          </div>

        {loading && (
          <div className="novedades-state">
            <div className="novedades-spinner" />
            <span>Cargando novedades...</span>
          </div>
        )}

        {error && !loading && (
          <div className="novedades-state novedades-state-error">
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="novedades-state">
            <span>No hay novedades disponibles.</span>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="novedades-grid">
            {posts.map((post) => {
              const image = getImage(post);
              const excerpt = stripHtml(post.excerpt?.rendered || "");
              return (
                <article key={post.id} className="novedades-card">
                  {image && (
                    <div className="novedades-card-image">
                      <img src={image} alt={post.title?.rendered} loading="lazy" />
                    </div>
                  )}
                  {!image && (
                    <div className="novedades-card-image novedades-card-image-placeholder">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                  <div className="novedades-card-body">
                    <time className="novedades-card-date">{formatDate(post.date)}</time>
                    <h2 className="novedades-card-title"
                      dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
                    />
                    <p className="novedades-card-excerpt">{excerpt}</p>
                    <button
                      className="novedades-card-btn"
                      onClick={() => navigate(`/novedades/${post.id}`)}
                    >
                      Leer más →
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {totalPages > 1 && !loading && (
          <div className="novedades-pagination">
            <button
              className="novedades-page-btn"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              ← Anterior
            </button>
            <span className="novedades-page-info">Página {page} de {totalPages}</span>
            <button
              className="novedades-page-btn"
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