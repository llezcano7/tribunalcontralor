import React from "react";
import "./organizacion.css"
import AnimationOrganization from "../components/animationorgnization";
import AnimationBook from "../components/animationbook";
import AnimationCounter from "../components/animationcounter";


export default function Organizacion() {

    const organizacion = [
        {
            id: 1,
            title: "Departamento de Contralor",
            animacion: AnimationOrganization,
            description: `El Departamento de Contralor posee una Presidencia que será ejercida anualmente por el Vocal que el mismo cuerpo designe en la primera quincena de diciembre de cada año. El  Presidente podrá ser reelecto y ejercerá la representación del Tribunal y  la conducción administrativa, con las atribuciones y deberes que, legal y reglamentariamente, le correspondan. Tendrá doble voto en caso de empate. 
            
          En oportunidad del acuerdo anual de designación  del  Presidente, también  se fijará el orden en que los restantes miembros lo reemplazarán en caso de ausencia u otro impedimento.`},
        {
            id: 2,
            title: "Oficina técnica contable",
            animacion: AnimationCounter,
            description: `Conformada como mínimo por dos profesionales de las Ciencias Económicas de carácter permanente, con la función de coordinar la  gestión del Tribunal. Para ser designado en este cargo, es necesario poseer título habilitante con cinco (5) años de antigüedad en el ejercicio profesional o de desempeño en la Administración Pública Municipal, Provincial o Nacional. Serán designados por el Tribunal siguiendo el procedimiento del concurso  público y tendrán estabilidad en los términos que determine la ordenanza que regule el ingreso a planta permanente.`
        },

        {
            id: 3,
            title: "Asesoría letrada de carácter transitorio",
            animacion: AnimationBook,
            description: `Sin dedicación exclusiva, que estará a cargo de un abogado, con cinco (5) años de antigüedad en el ejercicio profesional o dos (2) años como mínimo consecutivos de desempeño en la Administración Pública Municipal, Provincial o Nacional. El mismo será designado por el Tribunal por medio de un concurso público de oposición y antecedentes, y tendrá la misma permanencia en el cargo que el mandato de los vocales del Tribunal que lo eligió. Su función será la de dictaminar, asesorar en asuntos jurídicos y legales e intervenir en todo otro asunto de su incumbencia  que le requiera el Tribunal de Contralor.`
        },
    ]

    return (
        <>
            <section className="organizacion-section container block-start">
                <div className="organizacion-title">
                    <h3>Nuestra organización</h3>
                </div>
                {organizacion.map((item, index) => {
                    const AnimacionComponent = item.animacion;

                    return (
                        <div key={item.id} className={`organizacion-item ${index % 2 === 0 ? 'align-right' : 'align-left'}`}>
                            <div className="organizacion-animacion">
                                <AnimacionComponent />
                            </div>

                            <div className="organizacion-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </section>
        </>
    )
}