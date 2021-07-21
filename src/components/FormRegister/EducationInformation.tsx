import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setEducationInformation } from '@/redux/actions/postActions';
import { Fragment, useState } from 'react';
import { FORM_FIELD_REQUIRED } from '../constants';

const EducationInformation = () => {
  const dispatch = useDispatch();
  const { global_information_education } = useSelector((res: any) => res.state);

  const [idData, setIdData] = useState(1);

  const handleAddNew = () => {
    const id = idData + 1;
    const data = global_information_education.data;
    let param = {
      id: id,
      school: { label: 'School', name: 'school', type: 'text', value: '', error: '' },
      major: { label: 'Major', name: 'major', type: 'text', value: '', error: '' },
      start_date: { label: 'Start Date', name: 'start_date', type: 'date', value: '', error: '' },
      end_date: { label: 'End Date', name: 'end_date', type: 'date', value: '', error: '' },
    };

    data.push(param);
    dispatch(setEducationInformation({ data: data, status: false }));
    setIdData(id);
  };

  const handleDelete = (id: number) => {
    const data = global_information_education.data;
    const idx = data.findIndex((x) => x.id === id);
    data.splice(idx, 1);
    dispatch(setEducationInformation({ data: data, status: false }));
  };

  const handleChange = (id: number, e: any) => {
    const data = global_information_education.data;
    const name = e.target.name;
    const val = e.target.value;

    const index = data.findIndex((x: any) => {
      return x.id === id;
    });

    const jsData = Object.assign({}, data[index]);
    switch (name) {
      case 'school':
        jsData.school.value = val;
        break;
      case 'major':
        jsData.major.value = val;
        break;
      case 'start':
        jsData.start_date.value = val;
        break;
      case 'end':
        jsData.end_date.value = val;
        break;
      default:
        break;
    }

    const dJson = Object.assign([], data);
    dJson[index] = jsData;

    dispatch(setEducationInformation({ data: dJson, status: false }));
  };

  return (
    <>
      <Card className="mt-3">
        <Card.Header>
          <h4 className="mb-0 font-weight-bold text-uppercase">Education</h4>
        </Card.Header>
        <Card.Body>
          {global_information_education.data.map((d: any, i: number) => {
            const school = d.school;
            const major = d.major;
            const startDate = d.start_date;
            const endDate = d.end_date;
            return (
              <Fragment key={i}>
                <Card className="mb-3">
                  <Card.Body>
                    <Form id={`form_${d.id}`}>
                      <Row>
                        <Col sm={6} xs={12}>
                          <Form.Group className="mb-3" controlId={school.name}>
                            <Form.Label>{school.label}</Form.Label>
                            <input
                              className="form-control"
                              type={school.type}
                              name="school"
                              onChange={(e) => {
                                handleChange(d.id, e);
                              }}
                            />
                            {school.error !== '' && <FORM_FIELD_REQUIRED />}
                          </Form.Group>
                        </Col>
                        <Col sm={6} xs={12}>
                          <Form.Group className="mb-3" controlId={major.name}>
                            <Form.Label>{major.label}</Form.Label>
                            <input
                              className="form-control"
                              name="major"
                              type={major.type}
                              onChange={(e) => {
                                handleChange(d.id, e);
                              }}
                            />
                            {major.error !== '' && <FORM_FIELD_REQUIRED />}
                          </Form.Group>
                        </Col>
                        <Col sm={6} xs={12}>
                          <Form.Group className="mb-3" controlId={startDate.name}>
                            <Form.Label>{startDate.label}</Form.Label>
                            <input
                              className="form-control"
                              name="start"
                              type={startDate.type}
                              onChange={(e) => {
                                handleChange(d.id, e);
                              }}
                            />
                            {startDate.error !== '' && <FORM_FIELD_REQUIRED />}
                          </Form.Group>
                        </Col>
                        <Col sm={6} xs={12}>
                          <Form.Group className="mb-3" controlId={endDate.name}>
                            <Form.Label>{endDate.label}</Form.Label>
                            <input
                              className="form-control"
                              name="end"
                              type={endDate.type}
                              onChange={(e) => {
                                handleChange(d.id, e);
                              }}
                            />
                            {endDate.error !== '' && <FORM_FIELD_REQUIRED />}
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                  {d.id !== 1 && (
                    <Card.Footer className="p-2 text-right">
                      <Button variant="danger" onClick={() => handleDelete(d.id)}>
                        <span className="fa fa-trash mr-2"></span>
                        Delete
                      </Button>
                    </Card.Footer>
                  )}
                </Card>
              </Fragment>
            );
          })}
          <Button className="mt-3" onClick={handleAddNew} variant="primary">
            Add New
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default EducationInformation;
