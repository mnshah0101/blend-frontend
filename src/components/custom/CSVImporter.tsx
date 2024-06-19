"use client";
import React, { useState } from 'react';
import { Importer, ImporterField } from 'react-csv-importer';
import 'react-csv-importer/dist/index.css';

type Props={

    handler: (rows: any) => void;

    };





const CsvImporter = ({handler}:Props) => {
  const [firstUser, setFirstUser] = useState(null);

  const handleData = async (rows: any) => {
    if (rows.length > 0) {
        setFirstUser(rows[0]);
        handler(rows);
    }
  };

  return (
    <div>
      <Importer
        dataHandler={handleData}
        defaultNoHeader={false}
        delimiter={','}
        restartable={false}
        onStart={({ file, preview, fields, columnFields }) => {
          console.log('Import started');
        }}
        onComplete={({ file, preview, fields, columnFields }) => {
          console.log('Import completed');
        }}
        onClose={({ file, preview, fields, columnFields }) => {
          console.log('Import closed');
        }}
      >
        <ImporterField name="Name" label="Name" />
        <ImporterField name="Email" label="Email" />
      </Importer>
      {firstUser && (
        <div>
          <h2>First User:</h2>
          <pre>{JSON.stringify(firstUser, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CsvImporter;
