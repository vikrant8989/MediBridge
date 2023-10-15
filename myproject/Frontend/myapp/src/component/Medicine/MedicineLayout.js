import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

const MedicineLayout = (props) => {
    return (
        <>
            {props.medicine.name ? (
                <div>
                    <section className="vh-100" >
                        <MDBContainer className="py-5 h-100">
                            <MDBRow className="justify-content-center align-items-center h-100">
                                <MDBCol lg="6" className="mb-4 mb-lg-0">
                                    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                                        <MDBRow className="g-0">
                                            <MDBCol md="4" className="gradient-custom text-center text-white"
                                                style={{ backgroundColor: "#f08484", borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                                <MDBCardImage src={`http://127.0.0.1:5001/get_image/${props.medicine.name}`}
                                                    alt="Avatar" className="my-5" style={{ width: '900px', borderRadius: "100px" }} fluid />
                                                <MDBTypography tag="h5">{props.medicine.name}</MDBTypography>
                                                <MDBCardText>{props.medicine.description}</MDBCardText>
                                                <MDBIcon far icon="edit mb-5" />
                                            </MDBCol>
                                            <MDBCol md="8">
                                                <MDBCardBody className="p-4">
                                                    <MDBTypography tag="h4">Information</MDBTypography>
                                                    <hr className="mt-0 mb-4" />
                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Brandname</MDBTypography>
                                                            <MDBCardText className="text-muted">{props.medicine.brandname}</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Category</MDBTypography>
                                                            <MDBCardText className="text-muted">{props.medicine.category}</MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Salt Composition</MDBTypography>
                                                            <MDBCardText className="text-muted">{props.medicine.saltcomposition}</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Unit Price</MDBTypography>
                                                            <MDBCardText className="text-muted">{props.medicine.unitprice}</MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <button type="button" className="btn btn-primary">Place Order</button>
                                                        </MDBCol>

                                                    </MDBRow>
                                                </MDBCardBody>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </section >
                </div>
            ) : (<h5 style={{display:'flex',justifyContent:'center'}}>Medicine not found</h5>)
            }
        </>
    )
}

export default MedicineLayout