import React from 'react';

const Styling = ({ files }) => (
  <div className="Styling">
    <h1>Styling</h1>
    <div className="Photos">
      {files && files.map(file => (
        <section key={file}>
          <img src={`/img/portfolio/${file}`} />
        </section>
      ))}
    </div>
  </div>
);

export default Styling;
