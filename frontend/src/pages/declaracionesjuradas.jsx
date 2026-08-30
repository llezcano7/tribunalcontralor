import React, { useState } from "react";
import './declaracionesjuradas.css';

const INITIAL_FORM = {
  nombre: "",
  apellido: "",
  email: "",
  legajo: "",
  pdf1: null,
  pdf2: null,
};

export default function DeclaracionesJuradas() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file && file.type !== "application/pdf") {
      setErrors((prev) => ({ ...prev, [name]: "El archivo debe ser un PDF." }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: file || null }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!form.apellido.trim()) newErrors.apellido = "El apellido es obligatorio.";
    if (!form.email.trim()) newErrors.email = "El email es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "El email no es válido.";
    if (!form.legajo.trim()) newErrors.legajo = "El número de legajo es obligatorio.";
    if (!form.pdf1) newErrors.pdf1 = "El PDF es obligatorio.";
    if (!form.pdf2) newErrors.pdf2 = "El PDF es obligatorio.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("apellido", form.apellido);
      formData.append("email", form.email);
      formData.append("legajo", form.legajo);
      if (form.pdf1) formData.append("pdf1", form.pdf1);
      if (form.pdf2) formData.append("pdf2", form.pdf2);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/declaraciones-juradas`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error en el servidor");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setStatus(null);
    // Reset file inputs manually
    document.querySelectorAll('input[type="file"]').forEach((el) => (el.value = ""));
  };

  console.log(import.meta.env.VITE_BACKEND_URL);

  return (
    <section className="ddjj-section container block-start">

      <div className="ddjj-title">
        <h3>Declaraciones Juradas</h3>
        <p>
          En relación con la presentación de las Declaraciones Juradas (DDJJ) correspondientes
          al cierre de información al 31 de diciembre de 2025 de los funcionarios públicos del
          Municipio de la Ciudad de San Carlos de Bariloche, informamos que se ha dispuesto la
          apertura del formulario web habilitado para la carga de la documentación.
          Se recuerda que los archivos en formato PDF deberán ser completados y enviados a través
          del formulario disponible en pantalla. Al momento de adjuntar la documentación, los
          archivos deberán denominarse con nombre completo y número de legajo.
          Asimismo, quienes deseen acceder a los archivos PDF editables deberán contar con el
          programa Adobe Acrobat instalado en su PC y/o smartphone.
        </p>
      </div>

      {status === "success" ? (
        <div className="ddjj-success">
          <div className="ddjj-success-icon">✓</div>
          <h4>¡Documentación enviada correctamente!</h4>
          <p>Su declaración jurada fue recibida. En breve recibirá un correo de confirmación.</p>
          <button className="ddjj-btn" onClick={handleReset}>Enviar otra declaración</button>
        </div>
      ) : (
        <form className="ddjj-form" onSubmit={handleSubmit} noValidate>

          <div className="ddjj-row">
            <div className="ddjj-field">
              <label htmlFor="nombre">Nombre <span className="ddjj-required">*</span></label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ingresá tu nombre"
                value={form.nombre}
                onChange={handleChange}
                className={errors.nombre ? "error" : ""}
              />
              {errors.nombre && <span className="ddjj-error">{errors.nombre}</span>}
            </div>

            <div className="ddjj-field">
              <label htmlFor="apellido">Apellido <span className="ddjj-required">*</span></label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                placeholder="Ingresá tu apellido"
                value={form.apellido}
                onChange={handleChange}
                className={errors.apellido ? "error" : ""}
              />
              {errors.apellido && <span className="ddjj-error">{errors.apellido}</span>}
            </div>
          </div>

          <div className="ddjj-row">
            <div className="ddjj-field">
              <label htmlFor="email">Email <span className="ddjj-required">*</span></label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="ddjj-error">{errors.email}</span>}
            </div>

            <div className="ddjj-field">
              <label htmlFor="legajo">Número de legajo <span className="ddjj-required">*</span></label>
              <input
                id="legajo"
                name="legajo"
                type="text"
                placeholder="Ej: 12345"
                value={form.legajo}
                onChange={handleChange}
                className={errors.legajo ? "error" : ""}
              />
              {errors.legajo && <span className="ddjj-error">{errors.legajo}</span>}
            </div>
          </div>

          <div className="ddjj-row">
            <div className="ddjj-field">
              <label htmlFor="pdf1">
                Anexo público (PDF) <span className="ddjj-required">*</span>
              </label>
              <div className={`ddjj-file-wrapper ${errors.pdf1 ? "error" : ""} ${form.pdf1 ? "has-file" : ""}`}>
                <input
                  id="pdf1"
                  name="pdf1"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFile}
                />
                <span className="ddjj-file-label">
                  {form.pdf1 ? `📄 ${form.pdf1.name}` : "📂 Seleccionar Anexo Público (PDF)"}
                </span>
              </div>
              {errors.pdf1 && <span className="ddjj-error">{errors.pdf1}</span>}
            </div>

            <div className="ddjj-field">
              <label htmlFor="pdf2">Anexo reservado (PDF) <span className="ddjj-required">*</span></label>
              <div className={`ddjj-file-wrapper ${errors.pdf2 ? "error" : ""} ${form.pdf2 ? "has-file" : ""}`}>
                <input
                  id="pdf2"
                  name="pdf2"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFile}
                />
                <span className="ddjj-file-label">
                  {form.pdf2 ? `📄 ${form.pdf2.name}` : "📂 Seleccionar Anexo Reservado (PDF)"}
                </span>
              </div>
              {errors.pdf2 && <span className="ddjj-error">{errors.pdf2}</span>}
            </div>
          </div>

          <p className="ddjj-note">
            <span className="ddjj-required">*</span> Campos obligatorios. Los archivos deben estar nombrados con su nombre completo y número de legajo.
          </p>

          <button
            type="submit"
            className="ddjj-btn"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Enviando..." : "Enviar DDJJ"}
          </button>

        </form>
      )}

    </section>
  );
}