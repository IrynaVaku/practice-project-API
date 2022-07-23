import { expect } from 'chai';
import supertest from 'supertest';
import 'dotenv/config';

const randomEmail = 'dalao' + Math.floor(Math.random() * 1000) + '@ddt.com';

describe('Auth', () => {
  const request = supertest(process.env.BASE_URL);
  //console.log(request);
  it('Successful registration with valid credentials', () => {
    console.log('1', process.env.EMAIL);
    process.env['EMAIL'] = randomEmail;
    console.log('2', process.env.EMAIL);
    request
      .post('/user')
      .send({
        firstName: 'Iryna',
        lastName: 'Sasa',
        email: randomEmail,
        password: '123123',
      })
      .end((err, res) => {
        //console.log('statusCode', res.statusCode)
        console.log('body', res.body);
        expect(res.statusCode).to.eq(201);
        expect(res.body.message).to.eq(
          'User created successfully. Please check your email and verify it'
        );
      });
  });
  it('Successful login', () => {
    console.log('456', process.env.EMAIL);
    console.log('456', randomEmail);

    request
      .post('/user/login')
      .send({
        email: `"${randomEmail}"`,
        password: '123123',
      })
      .end((err, res) => {
        //console.log('statusCode', res.statusCode)
        console.log('body', res.body);
        expect(res.statusCode).to.eq(200);
        expect(res.body.message).to.eq('Auth success');
      });
  });
});
