
const requestLoggerMiddleware = (req: any, resp: any, next: any) => {
    console.log(`${req.method} ${req.originalUrl}`);
    const start = new Date().getTime();
    resp.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        console.log(`${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsed}ms`);
    });
    next();
};

export { requestLoggerMiddleware };

