import * as k8s from '@pulumi/kubernetes';
import {ComponentResource} from "@pulumi/pulumi";

export class ServiceExample extends ComponentResource{
    private name: string = 'S1'
    aService: k8s.core.v1.Service;

    constructor() {
        super('k8s:Service', 'S1');
        this.aService = this.createService()
    }

    createService: () => k8s.core.v1.Service = () => {
        return new k8s.core.v1.Service(
            this.name = '-service',
            {
                metadata: {
                    name: this.name,
                    namespace: 'one'
                },
                spec: {
                    selector: {
                        foo: 'bar'
                    },
                    ports: [
                        {
                            name: 'http',
                            port: 80,
                            targetPort: 80}
                    ]
                }

            }
        )
    }
}