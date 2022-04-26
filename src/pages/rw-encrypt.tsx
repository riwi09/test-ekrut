import crypto from 'crypto';
//import 'dotenv/config';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const algorithm = 'aes-128-cbc';
const ENCRYPTION_KEY = 'VUfpksDXvmkt5Gar'; //env encryp
const IV_LENGTH = 16;

const MainPage = () => {
  const [decryptionResult, setDecryptionResult] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const decrypt = (text) => {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'base64');
    let encryptedText = Buffer.from(textParts.join(':'), 'base64');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'utf-8'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  };

  const encrypt = (text) => {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'utf-8'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('base64') + ':' + encrypted.toString('base64');
  };

  const onSubmit = async (data) => {
    let txt = data.text_input;

    let result = decrypt(txt);
    setDecryptionResult(result);
  };

  return (
    <>
      <Container className="mt-3">
        <h1 className="text-center font-weight-bold">ABYNET PROJECT</h1>
        <hr />
        <Card>
          <Card.Header>
            <h4 className="mb-0 font-weight-bold text-uppercase">Encryption Text</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Text Input</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  {...register('text_input', {
                    required: { value: true, message: 'This Fields is Required' },
                  })}
                />
                <Form.Text className="text-danger">{errors?.text_input?.message}</Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" className="px-3">
                SUBMIT
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Header>
            <h4 className="mb-0 font-weight-bold text-uppercase">Decryption Text</h4>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Result Encryption</Form.Label>
              <Form.Control as="textarea" rows={10} value={decryptionResult} />
              <Form.Text className="text-danger">{errors?.text_result?.message}</Form.Text>
            </Form.Group>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default MainPage;
