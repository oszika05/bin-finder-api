import { Strategy } from 'passport-http-bearer';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {OAuth2Client} from 'google-auth-library';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    private client: OAuth2Client;

    constructor(private configService: ConfigService) {
        super();
        this.client = new OAuth2Client(configService.get<string>('GOOGLE_CLIENT_ID'));
    }

    async validate(token: string, done: any): Promise<any> {
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: this.configService.get<string>('GOOGLE_ANDROID_CLIENT_ID'),
        });
        const payload = ticket.getPayload();

        done(null, {
            id: payload.sub,
            email: payload.email,
        });
    }
}