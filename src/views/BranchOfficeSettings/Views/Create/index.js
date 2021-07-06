import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { General, Features, Images, Services } from 'views/BranchOfficeSettings/Sections';

import { Grid } from '@material-ui/core';

import axiosInstance from 'httpConfig';

const Create = () => {

    const history = useHistory();

    const [branchOffice, setBranchOffice] = useState({
        name: '',
        address: '',
        phone: '',
        schedules: '',
        typeServices: '',
        images: [],
        services: [],
        features: []
    });

    const [viewImages, setViewImages] = useState([]);

    const handleChangeGeneral = (name, value) => {

        const { services } = branchOffice;

        let newArr = services;

        if (name === "typeServices") {


            if (value === "Complex" || value === "Meeting rooms") {

                if (value === "Complex") {
                    newArr = services.map(({ name, price, surfaceType, gameMode }) => ({ name, price, surfaceType, gameMode }))
                }
                else if (value === "Meeting rooms") {
                    newArr = services.map(({ name, price, surfaceType }) => ({ name, price, surfaceType }))
                }

            }
            else {
                newArr = services.map(({ name, price }) => ({ name, price }))
            }

        }

        setBranchOffice({ ...branchOffice, services: newArr, [name]: value })
    };

    const handleChangeImage = (url, file) => setViewImages([...viewImages, { url, file }]);

    const handleRemove = index => {

        const newImages = [...viewImages];

        newImages.splice(index, 1);

        setViewImages([...newImages]);

    }

    const handleAdd = (to, value) => setBranchOffice({ ...branchOffice, [to]: [...branchOffice[to], value] })

    // const handleEdit = (to, value) => setBranchOffice({ ...branchOffice, [to]: [...value] })

    const handleRemoveOrEdit = (to, id) => {

        const arr = [...branchOffice[to]];

        const newArr = arr.filter(val => val !== id);

        setBranchOffice({ ...branchOffice, [to]: [...newArr] });

    };

    const handleSubmit = () => {

        const { name, address, phone, schedules, typeServices, services, features } = branchOffice;

        const imagesAux = viewImages.map(({ file }) => file);

        console.log(imagesAux);

        const form = new FormData();

        form.append("name", name);
        form.append("address", address);
        form.append("phone", phone);
        form.append("schedules", schedules);
        form.append("typeServices", typeServices);

        for (const file of imagesAux) {
            form.append("images", file);
        }

        form.append("services", services);
        form.append("features", features);

        const token = localStorage.getItem('spazer_token');

        const headers = {
            "Content-Type": "multipart/form-data",
            "access-token": token
        }

        axiosInstance.post('/branchOffice/create', form, { headers })
            .then(({ data }) => {
                console.log(data);
                history.push('/branch-offices')
            })
            .catch(err => console.error(err));

    }

    return (
        <Grid container spacing={4}>

            <General
                data={branchOffice}
                onChange={handleChangeGeneral}
                onSubmit={handleSubmit}
            />

            <Images
                images={viewImages}
                onChange={handleChangeImage}
                onRemove={handleRemove}
            />

            <Services
                onAdd={handleAdd}
                onRemove={handleRemoveOrEdit}
            />

            <Features
                onAdd={handleAdd}
                onRemove={handleRemoveOrEdit}
                type={branchOffice.typeServices}
            />

        </Grid>
    )
}

export default Create;