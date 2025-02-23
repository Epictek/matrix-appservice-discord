/*
Copyright 2017, 2018 matrix-appservice-discord

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { Presence } from "discord.js";

// we are a test file and thus need those
/* tslint:disable:no-unused-expression max-file-line-count no-any */

export class MockUser {
    public presence: Presence;
    constructor(
        public id: string,
        public username: string = "",
        public discriminator: string = "",
        public avatarUrl: string | null = "",
        public avatar: string | null = "",
        public bot: boolean = false,
    ) { }

    public avatarURL() {
        return this.avatarUrl;
    }

    public MockSetPresence(presence: Presence) {
        this.presence = presence;
    }
}
