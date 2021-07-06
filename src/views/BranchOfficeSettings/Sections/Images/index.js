import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types';

import { Container, EmptySection, Header, Image } from 'views/BranchOfficeSettings/components';

import { makeStyles } from '@material-ui/styles';
import { Alert } from 'components';


const useStyles = makeStyles(() => ({
    contentImages: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'left'
    }
}));

const Images = ({ images, onChange, onRemove }) => {

    const classes = useStyles();

    const [error, setError] = useState({ error: false, msg: '' })

    const inputFileRef = useRef(null);

    const handleChangeImageSelected = ({ target: { files } }) => {

        if (images.length < 10) {
            const url = URL.createObjectURL(files[0]);

            onChange(url, files[0]);
        }
        else {
            setError({ error: true, msg: 'Solo se permite un maximo de 10 imagenes' })
        }


    };

    const handleRemoveImage = (i) => onRemove(i);

    return (
        <>
            <Header
                sectionName="Imágenes (Máximo 10)"
                buttonText="Agregar imágen"
                isActiveMargin={true}
                onClickButton={() => inputFileRef.current.click()}
            />
            <Container>
                <input
                    type="file"
                    ref={inputFileRef}
                    hidden
                    onChange={handleChangeImageSelected}
                    accept="image/*"
                />

                {
                    images.length === 0 && <EmptySection title="No se han agregado imágenes" />
                }

                {
                    images.length > 0 && (
                        <div className={classes.contentImages}>
                            {
                                images.map(({ url }, i) => (
                                    <Image
                                        url={url}
                                        index={i}
                                        key={`image_${i}`}
                                        onRemove={() => handleRemoveImage(i)}
                                    />
                                ))
                            }
                        </div>
                    )
                }

            </Container>
            <Alert
                open={error.error}
                handleClose={() => setError({ error: false, msg: '' })}
                title={error.msg}
                type="error"
            />
        </>
    )
}

Images.propTypes = {
    images: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default Images;