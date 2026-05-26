import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

export default class MyToast extends Component {
  render() {
    const toastCss = {
      position: 'fixed', top: '20px', right: '20px', zIndex: 1,
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
    };
    const isSuccess = this.props.children.type === 'success';
    return (
      <div style={this.props.children.show ? toastCss : null}>
        <Toast
          className={`border text-white ${isSuccess ? 'border-success bg-success' : 'border-danger bg-danger'}`}
          show={this.props.children.show}>
          <Toast.Header
            className={`text-white ${isSuccess ? 'bg-success' : 'bg-danger'}`}
            closeButton={false}>
            <strong className="mr-auto">{isSuccess ? 'Success' : 'Suppression'}</strong>
          </Toast.Header>
          <Toast.Body>{this.props.children.message}</Toast.Body>
        </Toast>
      </div>
    );
  }
}
