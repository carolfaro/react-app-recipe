import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header title="Profile" showBt={ false } />
      <h1>Conteúdo</h1>
      <Footer />
    </div>
  );
}

export default Profile;
