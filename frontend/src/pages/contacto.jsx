import React from "react";
import ContactForm from "../components/ContactForm";
import './contacto.css'

export default function Contacto() {
    return (
        <>
        <section className='contact-inicio container block-start'>
                    <h3>Contacto</h3>
                    <h4>¿Tenés alguna consulta o sugerencia? ¡No dudes en contactarnos!</h4>
                    <ContactForm />
                </section>
        </>
    )
}