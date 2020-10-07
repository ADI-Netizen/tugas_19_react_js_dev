import React, { Component } from 'react';
import { Button, Card, Col, Container, FormControl, Row, Table } from 'react-bootstrap';
import Inputmodal from './Inputmodal';

class Konten extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataKaryawan: [],
            cariApa: '',
            inputId: '',
            inputNama: '',
            inputJabatan: '',
            inputJK: '',
            inputTanggal: ''
        }
        this.panggilData = this.panggilData.bind(this)
        this.cari = this.cari.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.clearInput = this.clearInput.bind(this)
        this.simpanData = this.simpanData.bind(this)
        this.hapusData = this.hapusData.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount() {
        this.panggilData()
    }

    // Ambil semua data di json server
    panggilData() {
        fetch('http://localhost:3000/data-karyawan')
            .then((response) => response.json())
            .then((hasil) => this.setState({ dataKaryawan: hasil }))
    }

    // Ambil Data Berdasarkan ID
    panggilById(id) {
        fetch(`http://localhost:3000/data-karyawan/${id}`)
            .then((response) => response.json())
            .then((hasil) => {
                this.props.setModalShow(true)
                this.setState({
                    inputId: hasil.id,
                    inputNama: hasil.nama_karyawan,
                    inputJabatan: hasil.jabatan,
                    inputJK: hasil.jenis_kelamin,
                    inputTanggal: hasil.tanggal_lahir
                })
            })
    }

    // Mencari Data di JSON Server
    cari(e) {
        this.setState({ cariApa: e.target.value })
    }

    // Ambil Nilai Input
    handleInput(value, e) {
        this.setState({ [value]: e.target.value })
    }

    // Hapus Inputan
    clearInput() {
        this.setState(
            {
                inputId: '',
                inputNama: '',
                inputJabatan: '',
                inputJK: '',
                inputTanggal: ''
            }
        )
    }

    // Menyimpan data ke JSON Server
    simpanData() {
        if (this.state.inputNama === "" || this.state.inputJabatan === "" || this.state.inputJK === "" || this.state.inputTanggal === "") {
            alert("Silahkan Isi Data Terlebih Dahulu")
        } else if (this.state.inputId === "") {
            fetch('http://localhost:3000/data-karyawan', {
                method: 'POST',
                body: JSON.stringify({
                    // id: this.state.inputId,
                    nama_karyawan: this.state.inputNama,
                    jabatan: this.state.inputJabatan,
                    jenis_kelamin: this.state.inputJK,
                    tanggal_lahir: this.state.inputTanggal
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((result => {
                    this.closeModal()
                    this.panggilData()
                }))
        } else {
            fetch(`http://localhost:3000/data-karyawan/${this.state.inputId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    // id: this.state.inputId,
                    nama_karyawan: this.state.inputNama,
                    jabatan: this.state.inputJabatan,
                    jenis_kelamin: this.state.inputJK,
                    tanggal_lahir: this.state.inputTanggal
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            })
                .then((response) => response.json())
                .then((hasil) => {
                    this.panggilData()
                    this.props.setModalShow(false)
                    this.clearInput()
                })
        }
    }

    hapusData(id) {
        fetch(`http://localhost:3000/data-karyawan/${id}`, { method: 'DELETE' }).then((response => { alert('Data Berhasil Dihapus'); this.panggilData() }))
    }

    closeModal() {
        this.props.setModalShow(false);
        this.clearInput()
    }

    render() {
        return (
            <Container className="mt-3" >
                <Inputmodal modalShow={this.props.modalShow} setModalShow={this.props.setModalShow} closeModal={this.closeModal} handleInput={this.handleInput} dataState={this.state} simpanData={this.simpanData} />
                <Row>
                    <Col>
                        <FormControl type="text" placeholder="Cari Data Karyawan" className="mr-sm-2" value={this.state.cariApa} onChange={(e) => this.cari(e)} />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Button variant="success" onClick={() => this.props.setModalShow(true)}>Tambah Data Karyawan</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    {/* <Table hover bordered variant="dark">
                                    <thead className="text-center">
                                        <tr>
                                            <th>NAMA KARYAWAN</th>
                                            <th>JABATAN</th>
                                            <th>JENIS KELAMIN</th>
                                            <th>TANGGAL LAHIR</th>
                                            <th>AKSI</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={index}>
                                            <td>{value.nama_karyawan}</td>
                                            <td>{value.jabatan}</td>
                                            <td>{value.jenis_kelamin}</td>
                                            <td>{value.tanggal_lahir}</td>
                                            <td className="text-center">
                                                <Button variant="warning" onClick={() => this.panggilById(value.id)}>Edit</Button>&nbsp;
                                                <Button variant="danger" onClick={() => this.hapusData(value.id)}>Hapus</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table> */}
                    {
                        this.state.dataKaryawan.filter(filter => filter.nama_karyawan.toLowerCase().includes(this.state.cariApa.toLowerCase())).map((value, index) => {
                            return (
                                // Tampilkan Melalui Card
                                < Card style={{ width: '350px', marginLeft: '20px', marginTop: '20px' }} key={index}>
                                    <Card.Img variant="top" src="https://p7.hiclipart.com/preview/247/564/869/computer-icons-user-profile-clip-art-user-avatar.jpg" style={{ borderRadius: '70%', width: '150px', margin: 'auto', padding: '10px' }} />
                                    <Card.Body>
                                        <Card.Text>
                                            <Table borderless>
                                                <tbody>
                                                    <tr>
                                                        <td>Nama</td>
                                                        <td>:</td>
                                                        <td>{value.nama_karyawan}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jabatan</td>
                                                        <td>:</td>
                                                        <td>{value.jabatan}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jenis Kelamin</td>
                                                        <td>:</td>
                                                        <td>{value.jenis_kelamin}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tanggal Lahir</td>
                                                        <td>:</td>
                                                        <td>{value.tanggal_lahir}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-center">
                                        <Button variant="warning" onClick={() => this.panggilById(value.id)}>Edit</Button>&nbsp;
                                                <Button variant="danger" onClick={() => this.hapusData(value.id)}>Hapus</Button>
                                    </Card.Footer>
                                </ Card>
                            )
                        })
                    }
                </Row>
            </Container >
        )
    }
}

export default Konten;