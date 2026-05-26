import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './myToast';

export default class Voiture extends Component {

  initialState = {
    id: '', marque: '', modele: '', couleur: '',
    immatricule: '', annee: '', prix: '', show: false
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
  }

  componentDidMount() {
    const voitureId = this.props.match.params.id;
    if (voitureId) {
      axios.get("/voitures/" + voitureId)
          .then(response => {
            if (response.data != null) {
              this.setState(response.data);
            }
          });
    }
  }

  resetVoiture = () => {
    this.setState(() => this.initialState);
  };

  submitVoiture = event => {
    event.preventDefault();
    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: this.state.annee,
      prix: this.state.prix
    };
    const voitureId = this.props.match.params.id;
    if (voitureId) {
      axios.put("/voitures/" + voitureId, voiture)
          .then(response => {
            if (response.data != null) {
              this.setState({ show: true });
              setTimeout(() => this.setState({ show: false }), 3000);
            }
          });
    } else {
      axios.post("/voitures", voiture)
          .then(response => {
            if (response.data != null) {
              this.setState({ ...this.initialState, show: true });
              setTimeout(() => this.setState({ show: false }), 3000);
            }
          });
    }
  };

  voitureChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { marque, modele, couleur, immatricule, prix, annee } = this.state;
    const isEdit = !!this.props.match.params.id;
    return (
        <div>
          <div style={{ display: this.state.show ? 'block' : 'none' }}>
            <MyToast children={{
              show: this.state.show,
              message: isEdit ? "Voiture mise à jour avec succès." : "Voiture enregistrée avec succès.",
              type: "success"
            }} />
          </div>
          <Card className="border border-dark bg-dark text-white">
            <Card.Header>
              <FontAwesomeIcon icon={isEdit ? faEdit : faPlusSquare} />
              {' '}{isEdit ? "Modifier la Voiture" : "Ajouter une Voiture"}
            </Card.Header>
            <Form onReset={this.resetVoiture} onSubmit={this.submitVoiture} id="VoitureFormId">
              <Card.Body>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridMarque">
                    <Form.Label>Marque</Form.Label>
                    <Form.Control required name="marque" type="text" value={marque}
                                  autoComplete="off" onChange={this.voitureChange}
                                  className="bg-dark text-white" placeholder="Entrez Marque Voiture" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridModele">
                    <Form.Label>Modele</Form.Label>
                    <Form.Control required name="modele" type="text" value={modele}
                                  autoComplete="off" onChange={this.voitureChange}
                                  className="bg-dark text-white" placeholder="Entrez Modele Voiture" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridCouleur">
                    <Form.Label>Couleur</Form.Label>
                    <Form.Control required name="couleur" type="text" value={couleur}
                                  autoComplete="off" onChange={this.voitureChange}
                                  className="bg-dark text-white" placeholder="Entrez Couleur Voiture" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridImmatricule">
                    <Form.Label>Immatricule</Form.Label>
                    <Form.Control required name="immatricule" type="text" value={immatricule}
                                  autoComplete="off" onChange={this.voitureChange}
                                  className="bg-dark text-white" placeholder="Entrez Immatricule" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridPrix">
                    <Form.Label>Prix</Form.Label>
                    <Form.Control required name="prix" type="number" value={prix}
                                  autoComplete="off" onChange={this.voitureChange}
                                  className="bg-dark text-white" placeholder="Entrez Prix Voiture" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridAnnee">
                    <Form.Label>Annee</Form.Label>
                    <Form.Control required name="annee" type="number" value={annee}
                                  autoComplete="off" onChange={this.voitureChange}
                                  className="bg-dark text-white" placeholder="Entrez Annee Voiture" />
                  </Form.Group>
                </Form.Row>
              </Card.Body>
              <Card.Footer style={{ textAlign: 'right' }}>
                <Button size="sm" variant="success" type="submit">
                  <FontAwesomeIcon icon={faSave} /> Submit
                </Button>{' '}
                <Button size="sm" variant="info" type="reset">
                  <FontAwesomeIcon icon={faUndo} /> Reset
                </Button>
              </Card.Footer>
            </Form>
          </Card>
        </div>
    );
  }
}