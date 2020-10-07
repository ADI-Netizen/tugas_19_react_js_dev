import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function Inputmodal(props) {
    return (
        <>
            <Modal size='md' centered show={props.modalShow} onHide={() => props.setModalShow(true)}>
                <Modal.Header>
                    <Modal.Title style={{ margin: 'auto' }}>Data Karyawan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form.Control className="mb-3" value={props.dataState.inputId} onChange={(e) => props.handleInput('inputId', e)} type="text" placeholder="ID Karyawan" /> */}
                    <Form.Control className="mb-3" value={props.dataState.inputNama} onChange={(e) => props.handleInput('inputNama', e)} type="text" placeholder="Nama Karyawan" />
                    <Form.Control className="mb-3" value={props.dataState.inputJabatan} onChange={(e) => props.handleInput('inputJabatan', e)} type="text" placeholder="Jabatan Karyawan" />
                    <Form.Control className="mb-3" value={props.dataState.inputJK} onChange={(e) => props.handleInput('inputJK', e)} type="text" placeholder="Jenis Kelamin Karyawan" />
                    <Form.Control className="mb-3" value={props.dataState.inputTanggal} onChange={(e) => props.handleInput('inputTanggal', e)} type="date" placeholder="Tanggal Lahir Karyawan" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.closeModal()}>Close</Button>
                    <Button variant="primary" onClick={() => props.simpanData()} >Simpan</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Inputmodal;