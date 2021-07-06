import { useGet } from 'hooks/useGet';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from 'components';
import { Grid } from '@material-ui/core';
import { Features, General, Images, Services } from 'views/BranchOfficeSettings/Sections';

const Edit = () => {

    const { id } = useParams();
    const [loading, branchOfficeData] = useGet(`/branchOffice/${id}`);
    const [branchOffice, setBranchOffice] = useState({});
    const [nameBranchOffice, setNameBranchOffice] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (!loading) {
            setBranchOffice(branchOfficeData.branchOffice)
            
            const {name, images: Images} = branchOfficeData.branchOffice;
            
            setNameBranchOffice(`Sucursal ${name}`);

            const newArrImages = Images.map(val => ({file: val, url: val}))

            setImages(newArrImages);

        }
    }, [loading, branchOfficeData])

    return (
        <>
            {
                loading && (
                    <Loading />
                )
            }
            {
                !loading && (
                    <Grid container spacing={4}>

                        <General
                            data={branchOffice}
                            onChange={() => {}}
                            onSubmit={() => {}}
                            title={nameBranchOffice}
                            // onChange={handleChangeGeneral}
                            // onSubmit={handleSubmit}
                        />

                        <Images
                            images={images}
                            onChange={() => {}}
                            onRemove={() => {}}
                            // images={viewImages}
                            // onChange={handleChangeImage}
                            // onRemove={handleRemove}
                        />

                        <Services
                            onAdd={() => {}}
                            onRemove={() => {}}
                        // onAdd={handleAdd}
                        // onRemove={handleRemoveOrEdit}
                        />

                        <Features
                            onAdd={() => {}}
                            onRemove={() => {}}
                            type={''}
                        // onAdd={handleAdd}
                        // onRemove={handleRemoveOrEdit}
                        // type={branchOffice.typeServices}
                        />

                    </Grid>
                )
            }
        </>
    )
}

export default Edit;