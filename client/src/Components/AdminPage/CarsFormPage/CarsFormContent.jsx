import React from 'react'
import useWindowWidth from '../../../Hooks/useWindowWidth';
import './CarsFormContent.css'
import { MyTextInput } from '../../../Hooks/GenericInputFormik'
import { MySelect } from '../../../Hooks/GenericSelectFormik'

export default function CarsFormContent({ updateForm, setFieldValue, token }) {


    const handleFileChange = (event) => {
        const files = event.currentTarget.files;
        if (files.length > 0) {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append('file', file);
            });

            fetch('http://51.210.124.204:8000/file', {
                method: 'POST',
                headers: {
                    'x-access-token': token,
                },
                body: formData,
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`Erreur lors de l'enregistrement du fichier : ${response.status} ${response.statusText}`);
                    }
                })
                .then(fileData => {
                    console.log('Fichier enregistré :', fileData);
                    setFieldValue('file', fileData);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    const width = useWindowWidth()
    return (
        <>
            <fieldset disabled={!updateForm} style={{ marginTop: '20px' }}>
                <div className='pb-2'>
                    <h2 className='has-text-left title is-5 mb-2'>Nom de l'annonce :</h2>
                    <MyTextInput
                        label=""
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Ex : Citroën C4 110ch année 2016"
                    />
                </div>

                <div className={` is-flex is-justify-content-space-between mt-2 mb-2 ${width > 1023 ? ' is-flex-direction-row ' : 'is-flex-direction-column'}`}>
                    <MySelect label="Catégorie" id="features.bodyCar" name="features.bodyCar">
                        <option value="">Catégorie</option>
                        <option value="Citadine">Citadine</option>
                        <option value="Berline">Berline</option>
                        <option value="Break">Break</option>
                        <option value="Monospace">Monospace</option>
                        <option value="4X4">4X4</option>
                        <option value="Coupé">Coupé</option>
                        <option value="Cabriolet">Cabriolet</option>
                        <option value="Pick-up">Pick-up</option>
                    </MySelect>

                    <MySelect label="Marque" id="brand" name="brand">
                        <option value="">Marque</option>
                        <option value="Renault">Renault</option>
                        <option value="Peugeot">Peugeot</option>
                        <option value="Citroën">Citroën</option>
                        <option value="Opel">Opel</option>
                        <option value="Audi">Audi</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="Volkswagen">Volkswagen</option>
                        <option value="Toyota">Toyota</option>
                    </MySelect>

                    <MySelect label="Places assises" id="features.seatingCapacity" name="features.seatingCapacity">
                        <option value="">Nombre de places assises</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </MySelect>

                    <MySelect label="Carburant" id="features.power" name="features.power">
                        <option value="">Type de carburant</option>
                        <option value="Essence">Essence</option>
                        <option value="Gasoil">Gasoil</option>
                    </MySelect>
                </div>

                <div className='pb-2'>
                    <h2 className='has-text-left title is-5 mb-2'>Date de mise en circulation :</h2>
                    <MyTextInput
                        label="Date de mise en circulation"
                        id="date"
                        name="date"
                        type="date"
                    />
                </div>

                <div className='pb-2'>
                    <h2 className='has-text-left title is-5 mb-2'>Description : </h2>
                    <MyTextInput
                        label="Description"
                        id="description"
                        name="description"
                        type="textarea"
                        placeholder=""
                    />

                </div>

                <div className={` is-flex is-justify-content-center${width > 1023 ? ' is-flex-direction-row ' : 'is-flex-direction-column'}`}>
                    <div className='p-2'>
                        <div className='mb-3'>
                            <h2 className='has-text-centered title is-5 mb-2'>Prix :</h2>
                            <MyTextInput
                                label="Prix"
                                id="price"
                                name="price"
                                type="number"
                            />
                        </div>
                        <div className='mb-3'>
                            <h2 className='has-text-centered title is-5 mb-2'>Kilométrage :</h2>
                            <MyTextInput
                                label="Kilométrage"
                                id="milage"
                                name="milage"
                                type="number"
                            />
                        </div>
                    </div>
                    <div className='p-2'>
                        <div className='mb-3'>
                            <h2 className='has-text-centered title is-5 mb-2'>Puissance fiscale :</h2>
                            <MyTextInput
                                label="Cylindre"
                                id="features.engine"
                                name="features.engine"
                                type="number"

                            />
                        </div>
                        <div className='mb-3'>
                            <h2 className='has-text-centered title is-5 mb-2'>Puissance DIN :</h2>
                            <MyTextInput
                                label="Puissance fiscale"
                                id="features.fiscalHorsePower"
                                name="features.fiscalHorsePower"
                                type="number"
                            />
                        </div>
                    </div>
                </div>

                <div className='pb-2'>
                    <h2 className='has-text-left title is-5 mb-2'>Options :</h2>
                    <MyTextInput
                        label="Options"
                        id="options"
                        name="options"
                        type="textarea"
                        placeholder=""
                    />
                </div>
                {updateForm ?
                    <div className='pb-2 is-flex is-justify-content-center'>
                        <MyTextInput
                            label="Image"
                            id="file"
                            name="file"
                            type="file"
                            multiple="multiple"
                            onChange={handleFileChange}
                            value={undefined}
                        />
                    </div>
                    : ''}

            </fieldset>
        </>
    )
}
