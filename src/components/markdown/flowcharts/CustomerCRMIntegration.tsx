'use client';

import { Flowchart, SequenceAction, SequenceActor, createSequenceDiagram } from '@openmrp/ui';

/**
 * Simple example of a flowchart showing API request flow
 */
export function CustomerCRMIntegration() {
    // Define the actors
    const actors: SequenceActor[] = [
        {
            id: 'sales',
            label: 'Sales',
            color: 'red',
        },
        {
            id: 'crm',
            label: 'CRM',
            color: 'green',
        },
        {
            id: 'openmrp',
            label: 'OpenMRP API',
            color: 'var(--primary)',
        },
    ];

    // Define the actions
    const actions: SequenceAction[] = [
        {
            source: 'sales',
            target: 'crm',
            label: 'Add a new customer',
            row: 2,
        },
        {
            source: 'crm',
            target: 'openmrp',
            label: 'Send customer information',
            row: 2,
        },
        {
            source: 'openmrp',
            target: 'openmrp',
            label: 'Customer created',
            row: 3,
        },
        {
            source: 'openmrp',
            target: 'crm',
            label: 'Add OpenMRP ID to customer',
            row: 4,
            event: 'customer.created',
        },
    ];

    // Generate nodes and edges using our helper function
    const { nodes, edges } = createSequenceDiagram({
        actors,
        actions,
    });

    return <Flowchart nodes={nodes} edges={edges} height={500} isPro />;
}
