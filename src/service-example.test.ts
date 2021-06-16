import * as pulumi from '@pulumi/pulumi';
import { MockCallArgs } from '@pulumi/pulumi/runtime';
import { describe, it, before } from 'mocha';

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: MockCallArgs) {
        return args.inputs;
    },
});

describe('Example Service',  () => {
    let definitions: typeof import('./service-example');
    before(async () => {
        definitions = await import('./service-example');
    })
    it('should forward port 80 to 80', (done) => {
        pulumi.all([definitions.ServiceExample]).apply(([ServiceExample]) => {
            const se = new ServiceExample()
            const service = se.aService;
            done()
        })

    });
})