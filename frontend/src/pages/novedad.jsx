import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./novedades.css";
import "./novedad.css";

const WP_API = import.meta.env.VITE_WP_API;

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const stripHtml = (html) => html.replace(/<[^>]*>/g, "");

export default function Novedad() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch nota principal
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${WP_API}/posts/${id}?_embed`);
        if (!res.ok) throw new Error("Novedad no encontrada");
        setPost(await res.json());
      } catch {
        setError("No se pudo cargar la novedad.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch novedades relacionadas
  useEffect(() => {
    if (!id) return;
    fetch(`${WP_API}/posts?_embed&per_page=4&orderby=date&order=desc`)
      .then((res) => res.json())
      .then((data) =>
        setRelated(data.filter((p) => p.id !== Number(id)).slice(0, 3))
      )
      .catch(() => setRelated([]));
  }, [id]);

  const getImage = (post) => {
    return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
  };

  return (
    <section className="novedad-section container block-start">

        {loading && (
          <div className="novedades-state">
            <div className="novedades-spinner" />
            <span>Cargando novedad...</span>
          </div>
        )}

        {error && !loading && (
          <div className="novedades-state novedades-state-error">
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && post && (
          <article className="novedades-detail">
           
            <div className="novedades-detail-body">
              <time className="novedades-card-date">{formatDate(post.date)}</time>
              <h1
                className="novedades-detail-title"
                dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
              />
              <div
                className="novedades-detail-content"
                dangerouslySetInnerHTML={{ __html: post.content?.rendered }}
              />
            </div>
          </article>
        )}

        {/* OTRAS NOVEDADES */}
        {related.length > 0 && !loading && (
          <div className="novedades-related">
            <h3>Otras novedades</h3>
            <div className="novedades-grid">
              {related.map((item) => {
                const image = getImage(item);
                const excerpt = stripHtml(item.excerpt?.rendered || "");
                return (
                  <article key={item.id} className="novedades-card">
                    {image && (
                      <div className="novedades-card-image">
                        <img src={image} alt={item.title?.rendered} loading="lazy" />
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
                      <time className="novedades-card-date">{formatDate(item.date)}</time>
                      <h2
                        className="novedades-card-title"
                        dangerouslySetInnerHTML={{ __html: item.title?.rendered }}
                      />
                      <p className="novedades-card-excerpt">{excerpt}</p>
                      <button
                        className="novedades-card-btn"
                        onClick={() => navigate(`/novedades/${item.id}`)}
                      >
                        Leer más →
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
    </section>
  );
}

