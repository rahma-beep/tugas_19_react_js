import React, { Component } from "react";
import axios from "axios";
import { Navbar, TextInput, Row, Col, Button, Card, Icon } from "react-materialize";

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataKaryawan: [],
      edit: false,
      listData:{
        id: 0,
        nama_karyawan: '',
        jabatan: '',
        jenis_kelamin: '',
        tanggal_lahir: ''
      }
    };
    this.hapusData=this.hapusData.bind(this);
    this.ubahData=this.ubahData.bind(this);
    this.tambahData=this.tambahData.bind(this);
  }
  reloadData(){
    axios.get('http://localhost:3004/data-karyawan').then ( bal => {
      this.setState({
        dataKaryawan: bal.data,
        edit: false
      });
    })
  }

  hapusData(e){
    console.log(e.target.value);
    fetch(`http://localhost:3004/data-karyawan/${e.target.value}`, {method: "DELETE"
    }).then(bal => this.reloadData());
  }

  ubahData(e){
    let newlistData = {...this.state.listData};
    if(this.state.edit === false){
    newlistData['id'] = new Date().getTime();
  }
    newlistData[e.target.name] = e.target.value;
    this.setState({
      listData: newlistData
    }, ()=>console.log(this.state.listData))
  }
  clearData=()=>{
    let newlistData = {...this.state.listData};
    newlistData['id']="";
    newlistData['nama_karyawan']="";
    newlistData['jabatan']="";
    newlistData['jenis_kelamin']="";
    newlistData['tanggal_lahir']="";

    this.setState({
      listData: newlistData
    });
  }
  tambahData(){
    if(this.state.edit === false){
    axios.post(`http://localhost:3004/data-karyawan`, this.state.listData).then(()=> {
      this.reloadData();
      this.clearData();

      });
    } else {
      axios.put(`http://localhost:3004/data-karyawan/${this.state.listData.id}`, this.state.listData)
        .then(()=>{
          this.reloadData();
          this.clearData();
        })
    }
  }
  tarikData=(e)=>{
      axios.get(`http://localhost:3004/data-karyawan/${e.target.value}`)
        .then(bal=> {
          this.setState({
            listData: bal.data,
            edit: true
          })
        })

  }
  componentDidMount(){
  axios.get('http://localhost:3004/data-karyawan').then ( bal => {
    this.setState({
      dataKaryawan: bal.data
    });
  });
  }
  render() {
    return (
      <div>
      <Navbar style={{textAlign: "left"}}
  brand={<a className="brand-logo" href="#">Data Karyawan</a>}>
</Navbar>
<br/>
<Row>
<Col>
  <TextInput
  label="Masukkan Nama Karyawan"
  name="nama_karyawan"
  onChange={this.ubahData}
  value={this.state.listData.nama_karyawan}/>
</Col>
<Col>
<TextInput
label="Masukkan Jabatan"
name="jabatan"
value={this.state.listData.jabatan}
onChange={this.ubahData}/>
</Col>
<Col>
<TextInput
label="Masukkan Jenis Kelamin"
name="jenis_kelamin"
value={this.state.listData.jenis_kelamin}
onChange={this.ubahData}/>
</Col>
<Col>
<TextInput
type="date"
name="tanggal_lahir"
value={this.state.listData.tanggal_lahir}
onChange={this.ubahData}/>
</Col>
<Col>
<Button
  node="button"
  type="submit"
  waves="light"
  onClick={this.tambahData}
>
  Save Data
</Button>
</Col>
</Row>
      {this.state.dataKaryawan.map((dat,index) => {
        return (
          <div key={index}>
          <Row>
  <Col
    m={3}
    s={6}
  >
    <Card
      actions={[
        <Row>
        <Col>
        <Button className="red" value={dat.id} onClick={this.hapusData}>Delete</Button>,
        </Col>
        <Col>
        <Button value={dat.id} onClick={this.tarikData}>Edit Data</Button>
        </Col>
        </Row>

      ]}
      className="blue-grey darken-1"
      closeIcon={<Icon>close</Icon>}
      revealIcon={<Icon>more_vert</Icon>}
      textClassName="white-text"
    >
    <ul>
    <li>{dat.id}</li>
    <li>{dat.nama_karyawan}</li>
    <li>{dat.jabatan}</li>
    <li>{dat.jenis_kelamin}</li>
    <li>{dat.tanggal_lahir}</li>
    </ul>

    </Card>
  </Col>
</Row>


          </div>
        )
      })}

      </div>
    );
  }
}


export default App;
