import supertest from 'supertest';
import { expect } from 'chai';

describe('auth', function() {
    let result;

    describe('successful log in', function() {
        before(async function() {
            await supertest(process.env.BASE_URL)
                .post('/auth')
                .send({ login: process.env.LOGIN, password: process.env.PASSWORD })
                .then(res => {
                    result = res;
                });
        });

        it('response status code is 200', function() {
            expect(result.statusCode).to.eq(200);
        });

        it('response body contains authorization token', function() {
            expect(result.body.token).not.to.be.undefined;
        });
    });

    describe('log in with wrong credentials should return error', function() {
        before(async function() {
            await supertest(process.env.BASE_URL)
                .post('/auth')
                .send({ login: 'wrong', password: 'wrong' })
                .then(res => {
                    result = res;
                });
        });

        it('response status code is 404', function() {
            expect(result.statusCode).to.eq(404);
        });

        it('response status code is 404', function() {
            expect(result.body.message).to.eq('Wrong login or password.');
        });
    });
});