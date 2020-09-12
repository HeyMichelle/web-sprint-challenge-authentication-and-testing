const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
// const { authenticate } = require("./auth/authenticate-middleware.js");

// beforeAll(async () => {
// 	return (
// 		await db.migrate.rollback(), await db.migrate.latest(), await db.seed.run()
// 	);
// });

// afterAll(async () => {
// 	return await db.migrate.rollback();
// });

beforeEach(async() => {
    // run the seed db automatically with each test, to get a fresh database
    await db.seed.run()
})

afterAll(async () => {
  // close the database connection so the test process doesn't hang or give a warning
  await db.destroy();
});

describe("GET /", async () => {
	it('should GET /', async () => {
		const res = await supertest(server).get('/')
		expect(res.statusCode).toBe(200)
		expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
	})
})

describe("register route", async () => {
	it('should test user registration process', async () => {
		const res = await request(server)
			.post("/api/auth/register")
			.send({ username: "testUser", password: "12Ob67b6nt5" });
		expect(res.statusCode).toBe(201);
		expect(res.type).toBe("application/json");
		expect(res.body.username).toBe("testUser");
	});
});

describe("login route", async () => {
	it('should test user login process', async () => {
		const res = await request(server)
			.post("/api/auth/login")
			.send({ username: "testUser", password: "12Ob67b6nt5" });
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe("application/json");
		expect(res.body.message).toBe("Welcome testUser!");
	});
});

describe("jokes route", async () => {
	it('should test jokes login process', async () => {
		const fakeServer = request(server);
		await fakeServer
			.post("/api/auth/login")
			.send({ username: "testUser", password: "12Ob67b6nt5" });
		const res = await fakeServer.get("/api/jokes");
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe("application/json");
	});
});

describe("jokes integration tests", () => {
	it('should /GET /api/jokes', async () => {
	  const res = await request(server).get('/api/jokes')
	  expect(res.statusCode).toBe(401)
	  expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
	})
  })