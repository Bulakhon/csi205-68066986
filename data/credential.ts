type User = {
    email : string
    password : string
    name : string
    role : string
    other : string
}

const users: User[] = [
    {
        email: 'admin@company.com',
        password: 'pass',
        name: 'บุลากร หอมพันธุ์',
        role: 'admin',
        other: '...'
    },
    {
        email: 'user@company.com',
        password: 'pass',
        name: 'บุลากร หอมพันธุ์',
        role: 'user',
        other: '...'
    },
    {
        email: 'manager@company.com',
        password: 'pass',
        name: 'บุลากร หอมพันธุ์',
        role: 'manager',
        other: '...'
    },
]

type Credential = {
    token: string
    email: string
    name: string
    role: string
}

export const login = (email: string, pass: string): Promise<Credential | string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() <= 0.8) {
                const user = users.find((u) => u.email === email && u.password === pass)
                if (user === undefined) {reject('user is invalid') 
                    return}
                const newCredential: Credential = {
                    token: crypto.randomUUID(),
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
                resolve(newCredential)
            } else {
                reject('connection refused')
            }
        }, 1000 + Math.random() * 2000);
    })

}

export const logout = (token: string): Promise<string> => {
    return new Promise((resolve ,reject) => {
        setTimeout(() => {
            if (Math.random() <= 0.8) {
                resolve('success')
            } else {
                reject('connection refused')
            }
        }, 1000 + Math.random() * 2000);
    })
}