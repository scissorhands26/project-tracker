export const sampleData ={
  "project_id": "proj-001",
  "project_name": "ACME Internal Assessment",
  "description": "Internal pentest of ACME Corp's HQ LAN, DMZ, and guest Wi-Fi",
  "date_started": "2025-05-01T08:00:00Z",
  "date_completed": null,
  "created_by": "ryan",
  "networks": [
    {
      "network_id": "net-001",
      "name": "Internal LAN",
      "cidr_block": "10.0.0.0/24",
      "notes": "Simulated segment: Internal LAN"
    },
    {
      "network_id": "net-002",
      "name": "DMZ",
      "cidr_block": "10.0.1.0/24",
      "notes": "Simulated segment: DMZ"
    },
    {
      "network_id": "net-003",
      "name": "Guest Wi-Fi",
      "cidr_block": "10.0.2.0/24",
      "notes": "Simulated segment: Guest Wi-Fi"
    }
  ],
  "hosts": [
    {
      "host_id": "ded52b44-2a58-411e-a9d7-a7bb3dd63511",
      "ip_address": "10.0.0.190",
      "hostname": "internallan-host-1",
      "os": "CentOS 7",
      "status": "discovered",
      "first_seen": "2025-05-04T21:10:00Z",
      "last_updated": "2025-05-05T18:54:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "bc787b5b-b7eb-446c-975f-01d9fa59cb01",
      "ip_address": "10.0.0.157",
      "hostname": "internallan-host-2",
      "os": "Windows Server 2019",
      "status": "enumerated",
      "first_seen": "2025-05-07T14:56:00Z",
      "last_updated": "2025-05-03T02:18:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "2318b9a0-7e4f-4277-94ed-b2e31e799b11",
      "ip_address": "10.0.0.62",
      "hostname": "internallan-host-3",
      "os": "Windows Server 2019",
      "status": "exploited",
      "first_seen": "2025-05-09T06:41:00Z",
      "last_updated": "2025-05-01T10:29:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "a2cdaf76-a48f-4fb3-b8c3-dd6767bcf05d",
      "ip_address": "10.0.0.222",
      "hostname": "internallan-host-4",
      "os": "Ubuntu 20.04",
      "status": "discovered",
      "first_seen": "2025-05-12T07:00:00Z",
      "last_updated": "2025-05-04T03:06:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "76642632-3806-4694-8d5d-7ad0bf2fe69e",
      "ip_address": "10.0.0.188",
      "hostname": "internallan-host-5",
      "os": "macOS Big Sur",
      "status": "enumerated",
      "first_seen": "2025-05-01T11:09:00Z",
      "last_updated": "2025-05-02T01:01:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "5732c795-1719-49af-bd24-54eac6b08743",
      "ip_address": "10.0.0.197",
      "hostname": "internallan-host-6",
      "os": "Windows 10",
      "status": "exploited",
      "first_seen": "2025-05-02T14:53:00Z",
      "last_updated": "2025-05-12T02:56:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "d58b5f43-261c-47f0-89df-661610dce389",
      "ip_address": "10.0.0.181",
      "hostname": "internallan-host-7",
      "os": "Windows 10",
      "status": "discovered",
      "first_seen": "2025-05-08T05:04:00Z",
      "last_updated": "2025-05-10T20:02:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "0d13215f-2d9d-4988-a595-c6e80d18ac98",
      "ip_address": "10.0.0.44",
      "hostname": "internallan-host-8",
      "os": "macOS Big Sur",
      "status": "enumerated",
      "first_seen": "2025-05-10T19:28:00Z",
      "last_updated": "2025-05-03T22:01:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "1346dff8-4d4b-46a7-9dfc-34926e4bc7db",
      "ip_address": "10.0.0.150",
      "hostname": "internallan-host-9",
      "os": "CentOS 7",
      "status": "exploited",
      "first_seen": "2025-05-02T15:47:00Z",
      "last_updated": "2025-05-04T05:04:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "85c11292-f3ec-47e6-80f0-55644494bcfe",
      "ip_address": "10.0.0.73",
      "hostname": "internallan-host-10",
      "os": "Ubuntu 20.04",
      "status": "enumerated",
      "first_seen": "2025-05-02T08:28:00Z",
      "last_updated": "2025-05-11T05:52:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "3bab74e1-c19c-41aa-8d75-f2185c58995a",
      "ip_address": "10.0.0.225",
      "hostname": "internallan-host-11",
      "os": "macOS Big Sur",
      "status": "exploited",
      "first_seen": "2025-05-05T14:51:00Z",
      "last_updated": "2025-05-05T23:53:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "89768f67-f318-408b-a899-3bb26185f373",
      "ip_address": "10.0.0.101",
      "hostname": "internallan-host-12",
      "os": "Windows Server 2019",
      "status": "exploited",
      "first_seen": "2025-05-12T05:35:00Z",
      "last_updated": "2025-05-11T22:44:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "d5a5631f-13fa-4cfd-bf18-35b92dc8cd38",
      "ip_address": "10.0.0.21",
      "hostname": "internallan-host-13",
      "os": "CentOS 7",
      "status": "exploited",
      "first_seen": "2025-05-05T16:46:00Z",
      "last_updated": "2025-05-05T04:58:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "927730e4-65bf-4c52-aa54-5ac8f858b2f7",
      "ip_address": "10.0.0.115",
      "hostname": "internallan-host-14",
      "os": "CentOS 7",
      "status": "discovered",
      "first_seen": "2025-05-06T06:28:00Z",
      "last_updated": "2025-05-04T08:11:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "7f5bf22c-a2d8-4b67-afab-e7fba7d9ede9",
      "ip_address": "10.0.0.76",
      "hostname": "internallan-host-15",
      "os": "CentOS 7",
      "status": "discovered",
      "first_seen": "2025-05-11T12:21:00Z",
      "last_updated": "2025-05-08T12:48:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "e31fb4bf-913b-4770-a01c-87359af92c47",
      "ip_address": "10.0.0.78",
      "hostname": "internallan-host-16",
      "os": "Windows Server 2019",
      "status": "discovered",
      "first_seen": "2025-05-07T01:21:00Z",
      "last_updated": "2025-05-08T18:57:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "0b3a146e-6c4b-47a5-86f0-c4b719c6a490",
      "ip_address": "10.0.0.107",
      "hostname": "internallan-host-17",
      "os": "Ubuntu 20.04",
      "status": "discovered",
      "first_seen": "2025-05-02T20:34:00Z",
      "last_updated": "2025-05-06T09:09:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "a5415ba0-c3cf-4f1d-b1f4-ea72dc8d0097",
      "ip_address": "10.0.0.27",
      "hostname": "internallan-host-18",
      "os": "CentOS 7",
      "status": "discovered",
      "first_seen": "2025-05-07T18:35:00Z",
      "last_updated": "2025-05-03T06:40:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "719c9a6f-2553-47b7-835b-6e5f4a75dd85",
      "ip_address": "10.0.0.72",
      "hostname": "internallan-host-19",
      "os": "Ubuntu 20.04",
      "status": "exploited",
      "first_seen": "2025-05-11T14:14:00Z",
      "last_updated": "2025-05-02T19:25:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "1d5ec44d-b206-4252-9a20-cf098e5b7e45",
      "ip_address": "10.0.0.146",
      "hostname": "internallan-host-20",
      "os": "Windows 10",
      "status": "exploited",
      "first_seen": "2025-05-10T14:52:00Z",
      "last_updated": "2025-05-12T07:40:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "9a383028-5180-45b2-b4d7-5242b7782b3c",
      "ip_address": "10.0.0.248",
      "hostname": "internallan-host-21",
      "os": "Windows 10",
      "status": "discovered",
      "first_seen": "2025-05-03T21:54:00Z",
      "last_updated": "2025-05-11T06:04:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "d080433b-bd05-47bd-824f-cfc49cd71c6d",
      "ip_address": "10.0.0.77",
      "hostname": "internallan-host-22",
      "os": "Windows 10",
      "status": "exploited",
      "first_seen": "2025-05-03T20:50:00Z",
      "last_updated": "2025-05-09T07:34:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "3ea9d2a2-a5d9-40ba-961d-c4961521e880",
      "ip_address": "10.0.0.81",
      "hostname": "internallan-host-23",
      "os": "Ubuntu 20.04",
      "status": "enumerated",
      "first_seen": "2025-05-11T17:58:00Z",
      "last_updated": "2025-05-09T15:10:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "b54502d7-d57b-46a3-a1f1-3ae743020b39",
      "ip_address": "10.0.0.26",
      "hostname": "internallan-host-24",
      "os": "Windows 10",
      "status": "enumerated",
      "first_seen": "2025-05-02T11:36:00Z",
      "last_updated": "2025-05-12T02:04:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "da26f815-10a8-455e-9e9e-4b9359d2fc1c",
      "ip_address": "10.0.0.198",
      "hostname": "internallan-host-25",
      "os": "Ubuntu 20.04",
      "status": "exploited",
      "first_seen": "2025-05-09T12:08:00Z",
      "last_updated": "2025-05-07T16:21:00Z",
      "tags": [
        "internal-lan"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "fb879aa1-4a23-4c9e-bbc6-87ca084eb88b",
      "ip_address": "10.0.1.172",
      "hostname": "dmz-host-1",
      "os": "Windows Server 2019",
      "status": "exploited",
      "first_seen": "2025-05-10T22:29:00Z",
      "last_updated": "2025-05-05T14:41:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "25cdf0ba-17cc-4080-b582-0872e8869d35",
      "ip_address": "10.0.1.178",
      "hostname": "dmz-host-2",
      "os": "Windows 10",
      "status": "discovered",
      "first_seen": "2025-05-07T18:23:00Z",
      "last_updated": "2025-05-11T22:39:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "542f66f2-f1b1-4dc7-9d65-fea8bc1e3d38",
      "ip_address": "10.0.1.235",
      "hostname": "dmz-host-3",
      "os": "Windows 10",
      "status": "exploited",
      "first_seen": "2025-05-01T17:14:00Z",
      "last_updated": "2025-05-04T13:10:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "43fbe8fc-f186-427c-8890-fd2976de3ee5",
      "ip_address": "10.0.1.192",
      "hostname": "dmz-host-4",
      "os": "Ubuntu 20.04",
      "status": "enumerated",
      "first_seen": "2025-05-07T18:18:00Z",
      "last_updated": "2025-05-05T08:21:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "f2e161fc-d274-4dd1-9d8e-3d1d2b29d510",
      "ip_address": "10.0.1.185",
      "hostname": "dmz-host-5",
      "os": "Windows 10",
      "status": "discovered",
      "first_seen": "2025-05-10T00:58:00Z",
      "last_updated": "2025-05-11T01:24:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "b1b855fd-cacf-4ded-a03b-a418f0662e6b",
      "ip_address": "10.0.1.156",
      "hostname": "dmz-host-6",
      "os": "Windows 10",
      "status": "discovered",
      "first_seen": "2025-05-11T08:19:00Z",
      "last_updated": "2025-05-03T10:44:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "05856329-9ec2-4c47-b5b6-df97d3e92e01",
      "ip_address": "10.0.1.16",
      "hostname": "dmz-host-7",
      "os": "CentOS 7",
      "status": "enumerated",
      "first_seen": "2025-05-06T19:49:00Z",
      "last_updated": "2025-05-11T05:51:00Z",
      "tags": [
        "dmz"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "432653e5-9566-4858-83c5-090328fd60b2",
      "ip_address": "10.0.1.251",
      "hostname": "dmz-host-8",
      "os": "Windows 10",
      "status": "discovered",
      "first_seen": "2025-05-12T06:33:00Z",
      "last_updated": "2025-05-08T00:30:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "784f3803-e335-4e73-89fe-5f854540c983",
      "ip_address": "10.0.1.148",
      "hostname": "dmz-host-9",
      "os": "macOS Big Sur",
      "status": "enumerated",
      "first_seen": "2025-05-04T04:59:00Z",
      "last_updated": "2025-05-01T11:42:00Z",
      "tags": [
        "dmz"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "89bb7379-75ce-4703-82e7-7880ac3df0dc",
      "ip_address": "10.0.1.209",
      "hostname": "dmz-host-10",
      "os": "Windows Server 2019",
      "status": "exploited",
      "first_seen": "2025-05-02T05:45:00Z",
      "last_updated": "2025-05-09T09:21:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "af251dfe-a16e-4b4d-8343-92919b5360ba",
      "ip_address": "10.0.1.182",
      "hostname": "dmz-host-11",
      "os": "Windows 10",
      "status": "enumerated",
      "first_seen": "2025-05-08T07:53:00Z",
      "last_updated": "2025-05-07T20:11:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "a0bb69b3-3814-4582-8199-f9e193e3356b",
      "ip_address": "10.0.1.245",
      "hostname": "dmz-host-12",
      "os": "Windows 10",
      "status": "discovered",
      "first_seen": "2025-05-11T20:54:00Z",
      "last_updated": "2025-05-11T18:42:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "61de606f-a3a0-439f-a6f4-e66e651bf7ba",
      "ip_address": "10.0.1.105",
      "hostname": "dmz-host-13",
      "os": "Windows Server 2019",
      "status": "discovered",
      "first_seen": "2025-05-03T02:34:00Z",
      "last_updated": "2025-05-09T04:32:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "cbcb6f31-21b6-42cc-93b2-59baa9dbcb8a",
      "ip_address": "10.0.1.154",
      "hostname": "dmz-host-14",
      "os": "macOS Big Sur",
      "status": "discovered",
      "first_seen": "2025-05-04T18:44:00Z",
      "last_updated": "2025-05-07T07:01:00Z",
      "tags": [
        "dmz"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "49bb8f61-1d2c-4ffc-9f79-1ace5071fc4e",
      "ip_address": "10.0.1.53",
      "hostname": "dmz-host-15",
      "os": "Windows Server 2019",
      "status": "enumerated",
      "first_seen": "2025-05-11T01:11:00Z",
      "last_updated": "2025-05-04T16:11:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "ed36dbed-909b-4b1a-9c80-08eb774f6bc9",
      "ip_address": "10.0.1.215",
      "hostname": "dmz-host-16",
      "os": "Windows 10",
      "status": "exploited",
      "first_seen": "2025-05-02T03:11:00Z",
      "last_updated": "2025-05-11T11:17:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "1f01c81b-19ed-4708-bbff-f0238e5599ec",
      "ip_address": "10.0.1.188",
      "hostname": "dmz-host-17",
      "os": "CentOS 7",
      "status": "discovered",
      "first_seen": "2025-05-11T08:59:00Z",
      "last_updated": "2025-05-05T17:15:00Z",
      "tags": [
        "dmz"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "ac044339-1f88-45e2-9611-6511761e0a52",
      "ip_address": "10.0.1.46",
      "hostname": "dmz-host-18",
      "os": "Ubuntu 20.04",
      "status": "discovered",
      "first_seen": "2025-05-07T03:57:00Z",
      "last_updated": "2025-05-07T21:03:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "fd772e2e-2b4e-40ea-9fe9-1e04745287c8",
      "ip_address": "10.0.1.70",
      "hostname": "dmz-host-19",
      "os": "CentOS 7",
      "status": "discovered",
      "first_seen": "2025-05-05T16:03:00Z",
      "last_updated": "2025-05-11T10:19:00Z",
      "tags": [
        "dmz"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "4f2739f1-5c52-408b-8326-ce969ed41e56",
      "ip_address": "10.0.1.14",
      "hostname": "dmz-host-20",
      "os": "CentOS 7",
      "status": "enumerated",
      "first_seen": "2025-05-02T15:02:00Z",
      "last_updated": "2025-05-06T00:31:00Z",
      "tags": [
        "dmz"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "bc520f88-3439-4a83-9d61-82871e56e5c3",
      "ip_address": "10.0.1.17",
      "hostname": "dmz-host-21",
      "os": "Windows 10",
      "status": "exploited",
      "first_seen": "2025-05-03T05:26:00Z",
      "last_updated": "2025-05-03T11:15:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "d0898ed4-c0e4-4d59-a388-a516c960bdeb",
      "ip_address": "10.0.1.159",
      "hostname": "dmz-host-22",
      "os": "Ubuntu 20.04",
      "status": "enumerated",
      "first_seen": "2025-05-08T08:57:00Z",
      "last_updated": "2025-05-08T06:32:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "70e7340c-207e-48c2-b8ea-52e83660ba87",
      "ip_address": "10.0.1.83",
      "hostname": "dmz-host-23",
      "os": "Windows Server 2019",
      "status": "exploited",
      "first_seen": "2025-05-08T06:16:00Z",
      "last_updated": "2025-05-02T22:50:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "c9c3f29c-e5df-482f-86fc-40e2bd18bfe0",
      "ip_address": "10.0.1.119",
      "hostname": "dmz-host-24",
      "os": "Ubuntu 20.04",
      "status": "exploited",
      "first_seen": "2025-05-12T00:15:00Z",
      "last_updated": "2025-05-07T07:38:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "894c5318-f7e2-4d40-bbf5-2da7a8235c80",
      "ip_address": "10.0.1.24",
      "hostname": "dmz-host-25",
      "os": "Windows 10",
      "status": "discovered",
      "first_seen": "2025-05-02T13:03:00Z",
      "last_updated": "2025-05-03T09:25:00Z",
      "tags": [
        "dmz"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "19145b22-9eae-41a3-b5fa-ef825c48c5fc",
      "ip_address": "10.0.2.189",
      "hostname": "guestwi-fi-host-1",
      "os": "Windows 10",
      "status": "enumerated",
      "first_seen": "2025-05-11T23:42:00Z",
      "last_updated": "2025-05-06T04:34:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "852d0b64-01a8-4c05-939e-0b91e14cd0d1",
      "ip_address": "10.0.2.239",
      "hostname": "guestwi-fi-host-2",
      "os": "Windows Server 2019",
      "status": "discovered",
      "first_seen": "2025-05-06T14:36:00Z",
      "last_updated": "2025-05-05T23:41:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "a60ef342-5056-4ad0-87fe-cba25fb070b3",
      "ip_address": "10.0.2.179",
      "hostname": "guestwi-fi-host-3",
      "os": "macOS Big Sur",
      "status": "discovered",
      "first_seen": "2025-05-08T23:59:00Z",
      "last_updated": "2025-05-07T03:03:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "f9cf71c9-c4f1-4c81-bca1-25fbfb0a0787",
      "ip_address": "10.0.2.93",
      "hostname": "guestwi-fi-host-4",
      "os": "Windows 10",
      "status": "exploited",
      "first_seen": "2025-05-09T10:55:00Z",
      "last_updated": "2025-05-05T13:00:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "804ce922-36f9-4692-b155-614fd305ee60",
      "ip_address": "10.0.2.188",
      "hostname": "guestwi-fi-host-5",
      "os": "Windows Server 2019",
      "status": "discovered",
      "first_seen": "2025-05-02T20:59:00Z",
      "last_updated": "2025-05-08T01:15:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "22c78908-ba0c-4243-893e-982154b0f598",
      "ip_address": "10.0.2.19",
      "hostname": "guestwi-fi-host-6",
      "os": "Windows 10",
      "status": "enumerated",
      "first_seen": "2025-05-10T19:11:00Z",
      "last_updated": "2025-05-02T17:22:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "6942ce60-5f9f-4ed2-8efc-3aaaf790ae5d",
      "ip_address": "10.0.2.26",
      "hostname": "guestwi-fi-host-7",
      "os": "macOS Big Sur",
      "status": "exploited",
      "first_seen": "2025-05-02T18:34:00Z",
      "last_updated": "2025-05-05T19:13:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "f1138288-e8bd-4873-97b6-7de497b73a59",
      "ip_address": "10.0.2.113",
      "hostname": "guestwi-fi-host-8",
      "os": "Windows 10",
      "status": "exploited",
      "first_seen": "2025-05-04T19:02:00Z",
      "last_updated": "2025-05-05T22:10:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "f7dbfe87-441b-4c5b-aaa2-0a0eba579265",
      "ip_address": "10.0.2.58",
      "hostname": "guestwi-fi-host-9",
      "os": "Ubuntu 20.04",
      "status": "exploited",
      "first_seen": "2025-05-05T22:27:00Z",
      "last_updated": "2025-05-08T06:41:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "e9d2bc91-27c4-41e4-a554-6a19d5bfcd8d",
      "ip_address": "10.0.2.142",
      "hostname": "guestwi-fi-host-10",
      "os": "Windows Server 2019",
      "status": "exploited",
      "first_seen": "2025-05-08T07:19:00Z",
      "last_updated": "2025-05-07T22:45:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "47a282bf-90c9-46f8-9004-3473d5f8bb9c",
      "ip_address": "10.0.2.85",
      "hostname": "guestwi-fi-host-11",
      "os": "macOS Big Sur",
      "status": "enumerated",
      "first_seen": "2025-05-08T17:32:00Z",
      "last_updated": "2025-05-04T10:44:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "d7eb4cc9-7b1a-431a-8318-13036bf0a01d",
      "ip_address": "10.0.2.151",
      "hostname": "guestwi-fi-host-12",
      "os": "CentOS 7",
      "status": "discovered",
      "first_seen": "2025-05-03T20:07:00Z",
      "last_updated": "2025-05-06T20:30:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "f64c0e6c-3a64-4df0-b989-dbc5082e52a0",
      "ip_address": "10.0.2.168",
      "hostname": "guestwi-fi-host-13",
      "os": "macOS Big Sur",
      "status": "discovered",
      "first_seen": "2025-05-11T23:38:00Z",
      "last_updated": "2025-05-05T15:53:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "7974543b-e606-4883-b549-f1e25349a5b9",
      "ip_address": "10.0.2.92",
      "hostname": "guestwi-fi-host-14",
      "os": "macOS Big Sur",
      "status": "enumerated",
      "first_seen": "2025-05-05T00:01:00Z",
      "last_updated": "2025-05-07T21:50:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "60b34c2f-afc8-45c7-a047-ab7749c12606",
      "ip_address": "10.0.2.185",
      "hostname": "guestwi-fi-host-15",
      "os": "Windows Server 2019",
      "status": "enumerated",
      "first_seen": "2025-05-03T14:52:00Z",
      "last_updated": "2025-05-03T04:03:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "063a4104-ce0e-4229-8e53-16c534ce6958",
      "ip_address": "10.0.2.160",
      "hostname": "guestwi-fi-host-16",
      "os": "CentOS 7",
      "status": "discovered",
      "first_seen": "2025-05-01T21:35:00Z",
      "last_updated": "2025-05-01T20:50:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "974a3d24-9f57-4518-98ee-cd79d1f5dcec",
      "ip_address": "10.0.2.17",
      "hostname": "guestwi-fi-host-17",
      "os": "Windows 10",
      "status": "exploited",
      "first_seen": "2025-05-09T11:29:00Z",
      "last_updated": "2025-05-04T06:54:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "c3e00afa-f374-4295-b0d3-b09ee3c80e40",
      "ip_address": "10.0.2.211",
      "hostname": "guestwi-fi-host-18",
      "os": "Windows 10",
      "status": "enumerated",
      "first_seen": "2025-05-06T01:56:00Z",
      "last_updated": "2025-05-11T07:29:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "5a97779a-c930-48cd-8249-a4d3c658e70a",
      "ip_address": "10.0.2.130",
      "hostname": "guestwi-fi-host-19",
      "os": "Windows Server 2019",
      "status": "enumerated",
      "first_seen": "2025-05-11T14:00:00Z",
      "last_updated": "2025-05-11T15:06:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows Server 2019",
          "vulnerabilities": [
            "CVE-2020-0796"
          ]
        }
      ],
      "vulnerabilities": [
        "CVE-2020-0796"
      ],
      "notes": []
    },
    {
      "host_id": "3c39fb80-ba5a-4662-99e3-5fd9e4f53337",
      "ip_address": "10.0.2.96",
      "hostname": "guestwi-fi-host-20",
      "os": "Ubuntu 20.04",
      "status": "discovered",
      "first_seen": "2025-05-09T19:19:00Z",
      "last_updated": "2025-05-04T19:45:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "e7108fd1-ede6-4dfa-9069-d1a65762b706",
      "ip_address": "10.0.2.215",
      "hostname": "guestwi-fi-host-21",
      "os": "Windows 10",
      "status": "exploited",
      "first_seen": "2025-05-03T13:34:00Z",
      "last_updated": "2025-05-06T14:31:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "adc33cfc-a0b8-420a-93c2-0479409a978c",
      "ip_address": "10.0.2.122",
      "hostname": "guestwi-fi-host-22",
      "os": "Ubuntu 20.04",
      "status": "exploited",
      "first_seen": "2025-05-06T10:09:00Z",
      "last_updated": "2025-05-01T23:45:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 22,
          "protocol": "tcp",
          "service_name": "ssh",
          "product": "OpenSSH",
          "version": "8.0",
          "banner": "Ubuntu SSH",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "cd8f53de-da69-48a5-8425-4a20ce9be8ed",
      "ip_address": "10.0.2.252",
      "hostname": "guestwi-fi-host-23",
      "os": "Windows 10",
      "status": "enumerated",
      "first_seen": "2025-05-08T22:56:00Z",
      "last_updated": "2025-05-10T20:45:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [
        {
          "port": 445,
          "protocol": "tcp",
          "service_name": "smb",
          "product": "Windows SMB",
          "version": "3.0",
          "banner": "Windows 10",
          "vulnerabilities": []
        }
      ],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "d9616895-3715-422a-8de4-fb8a154fc3e7",
      "ip_address": "10.0.2.247",
      "hostname": "guestwi-fi-host-24",
      "os": "macOS Big Sur",
      "status": "enumerated",
      "first_seen": "2025-05-09T20:35:00Z",
      "last_updated": "2025-05-02T09:08:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    },
    {
      "host_id": "132c128c-a097-48e6-8168-f8f134c07ee9",
      "ip_address": "10.0.2.218",
      "hostname": "guestwi-fi-host-25",
      "os": "CentOS 7",
      "status": "exploited",
      "first_seen": "2025-05-08T03:40:00Z",
      "last_updated": "2025-05-04T05:06:00Z",
      "tags": [
        "guest-wi-fi"
      ],
      "services": [],
      "vulnerabilities": [],
      "notes": []
    }
  ],
  "exploits": [
    {
      "exploit_id": "8fde35af-7161-4992-b3df-f27bd1844fc9",
      "host_id": "2318b9a0-7e4f-4277-94ed-b2e31e799b11",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-11T03:36:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "6cf1884d-72a1-43e4-bb5b-749b478bd8c3",
      "host_id": "5732c795-1719-49af-bd24-54eac6b08743",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-05T03:47:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "c90936d9-ffdc-41ac-b428-2929b49a6d83",
      "host_id": "1346dff8-4d4b-46a7-9dfc-34926e4bc7db",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-10T13:51:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "d0b329c9-b7ea-47df-94b1-161ba28d5566",
      "host_id": "3bab74e1-c19c-41aa-8d75-f2185c58995a",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-02T21:53:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "90375716-9049-4311-9037-2d6f6a5eb58c",
      "host_id": "89768f67-f318-408b-a899-3bb26185f373",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-01T18:12:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "d946b53a-da04-4e49-90ca-8889730b5eab",
      "host_id": "d5a5631f-13fa-4cfd-bf18-35b92dc8cd38",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-09T10:37:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "5e53d973-bb60-46d0-b32a-1ac50e13a2ca",
      "host_id": "719c9a6f-2553-47b7-835b-6e5f4a75dd85",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-05T14:26:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "b8e78a65-bb6b-4aac-a9d7-52251e433b72",
      "host_id": "1d5ec44d-b206-4252-9a20-cf098e5b7e45",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-11T04:36:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "c8f190ea-3dbd-462e-9e32-f60b3b5b2430",
      "host_id": "d080433b-bd05-47bd-824f-cfc49cd71c6d",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-02T15:39:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "e9184c34-c767-42d9-85c1-31a3d4842c6e",
      "host_id": "da26f815-10a8-455e-9e9e-4b9359d2fc1c",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-03T16:26:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "af70f9fa-60a1-4224-b493-66029d168bb9",
      "host_id": "fb879aa1-4a23-4c9e-bbc6-87ca084eb88b",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-07T17:07:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "af74f8dc-e55c-4d97-b883-1e077a2adb5c",
      "host_id": "542f66f2-f1b1-4dc7-9d65-fea8bc1e3d38",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-08T03:33:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "41ba5518-a47e-4d6d-8879-6fad35390083",
      "host_id": "89bb7379-75ce-4703-82e7-7880ac3df0dc",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-03T17:23:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "cc0307cc-c6ef-41b6-b7b5-c1d701785420",
      "host_id": "ed36dbed-909b-4b1a-9c80-08eb774f6bc9",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-04T18:48:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "5fbcd23d-6512-453b-98b6-552a071fe0f7",
      "host_id": "bc520f88-3439-4a83-9d61-82871e56e5c3",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-10T02:51:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "a61a0897-4f72-4e27-b08d-dad28a337a2a",
      "host_id": "70e7340c-207e-48c2-b8ea-52e83660ba87",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-05T07:45:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "5ccac61f-ce82-4a86-8474-2f75a9a077d5",
      "host_id": "c9c3f29c-e5df-482f-86fc-40e2bd18bfe0",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-11T17:23:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "90414f40-7d23-45b4-a175-a07b8f3567f3",
      "host_id": "f9cf71c9-c4f1-4c81-bca1-25fbfb0a0787",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-09T09:36:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "dd25c8ac-2770-4198-aa85-ec320f91edde",
      "host_id": "6942ce60-5f9f-4ed2-8efc-3aaaf790ae5d",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-04T00:37:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "0b3b10e3-0add-4378-ba68-6a9568e0742c",
      "host_id": "f1138288-e8bd-4873-97b6-7de497b73a59",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-01T12:24:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "09da735c-7de2-433b-968d-202027980f58",
      "host_id": "f7dbfe87-441b-4c5b-aaa2-0a0eba579265",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-07T05:21:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "4bcbaff2-e4df-4cbc-b80a-c8c79ae56917",
      "host_id": "e9d2bc91-27c4-41e4-a554-6a19d5bfcd8d",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-09T07:00:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "22760dd3-ebfd-4645-a47a-86d652778eaf",
      "host_id": "974a3d24-9f57-4518-98ee-cd79d1f5dcec",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-01T14:35:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "040449e2-2eae-410b-8e5f-c8a9927f98a2",
      "host_id": "e7108fd1-ede6-4dfa-9069-d1a65762b706",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-03T20:06:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "6f0a3e79-e844-4768-8048-53dcae8e7a0d",
      "host_id": "adc33cfc-a0b8-420a-93c2-0479409a978c",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-09T23:26:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    },
    {
      "exploit_id": "713b78ca-d1c5-4ee0-a47f-2862ac3c27d3",
      "host_id": "132c128c-a097-48e6-8168-f8f134c07ee9",
      "type": "RCE",
      "tool_used": "exploit-tool",
      "date_executed": "2025-05-02T20:36:00Z",
      "result": "shell",
      "notes": "Autogenerated shell from exploit"
    }
  ],
  "credentials": [
    {
      "cred_id": "f2873c6e-207d-42b4-b55b-57f284af5915",
      "username": "user2@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "2318b9a0-7e4f-4277-94ed-b2e31e799b11",
      "obtained_via": "loot",
      "valid_for": [
        "2318b9a0-7e4f-4277-94ed-b2e31e799b11"
      ]
    },
    {
      "cred_id": "ec5e6ef6-c19a-4f9b-8e16-b0599829fabe",
      "username": "user5@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "5732c795-1719-49af-bd24-54eac6b08743",
      "obtained_via": "loot",
      "valid_for": [
        "5732c795-1719-49af-bd24-54eac6b08743"
      ]
    },
    {
      "cred_id": "7778643e-cf7d-4e55-8b7f-3cf405e74398",
      "username": "user8@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "1346dff8-4d4b-46a7-9dfc-34926e4bc7db",
      "obtained_via": "loot",
      "valid_for": [
        "1346dff8-4d4b-46a7-9dfc-34926e4bc7db"
      ]
    },
    {
      "cred_id": "dc6381e0-8a32-4c89-995d-695cfbf35140",
      "username": "user10@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "3bab74e1-c19c-41aa-8d75-f2185c58995a",
      "obtained_via": "loot",
      "valid_for": [
        "3bab74e1-c19c-41aa-8d75-f2185c58995a"
      ]
    },
    {
      "cred_id": "cf6a6272-5012-432c-aea9-4843c18ff89f",
      "username": "user11@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "89768f67-f318-408b-a899-3bb26185f373",
      "obtained_via": "loot",
      "valid_for": [
        "89768f67-f318-408b-a899-3bb26185f373"
      ]
    },
    {
      "cred_id": "61defa6b-ac5c-4f5f-b3f5-c78af7d4383f",
      "username": "user12@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "d5a5631f-13fa-4cfd-bf18-35b92dc8cd38",
      "obtained_via": "loot",
      "valid_for": [
        "d5a5631f-13fa-4cfd-bf18-35b92dc8cd38"
      ]
    },
    {
      "cred_id": "f4cfbc08-a4a3-425a-8e7e-d0c8f30fb956",
      "username": "user18@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "719c9a6f-2553-47b7-835b-6e5f4a75dd85",
      "obtained_via": "loot",
      "valid_for": [
        "719c9a6f-2553-47b7-835b-6e5f4a75dd85"
      ]
    },
    {
      "cred_id": "cbaf2abb-cf91-49ec-a2b6-2526b7f1a49c",
      "username": "user19@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "1d5ec44d-b206-4252-9a20-cf098e5b7e45",
      "obtained_via": "loot",
      "valid_for": [
        "1d5ec44d-b206-4252-9a20-cf098e5b7e45"
      ]
    },
    {
      "cred_id": "de74b78f-dda5-4f34-ad5e-7c67124eaa16",
      "username": "user21@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "d080433b-bd05-47bd-824f-cfc49cd71c6d",
      "obtained_via": "loot",
      "valid_for": [
        "d080433b-bd05-47bd-824f-cfc49cd71c6d"
      ]
    },
    {
      "cred_id": "37a2e1bd-f48c-4338-8f79-6eb3b1b66346",
      "username": "user24@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "da26f815-10a8-455e-9e9e-4b9359d2fc1c",
      "obtained_via": "loot",
      "valid_for": [
        "da26f815-10a8-455e-9e9e-4b9359d2fc1c"
      ]
    },
    {
      "cred_id": "83c9415e-37e0-45b8-b41f-33302b3b8375",
      "username": "user0@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "fb879aa1-4a23-4c9e-bbc6-87ca084eb88b",
      "obtained_via": "loot",
      "valid_for": [
        "fb879aa1-4a23-4c9e-bbc6-87ca084eb88b"
      ]
    },
    {
      "cred_id": "2666723d-cccf-44fa-aa61-f2a6b42db778",
      "username": "user2@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "542f66f2-f1b1-4dc7-9d65-fea8bc1e3d38",
      "obtained_via": "loot",
      "valid_for": [
        "542f66f2-f1b1-4dc7-9d65-fea8bc1e3d38"
      ]
    },
    {
      "cred_id": "0163df68-e752-4f6b-8338-e77c829393f6",
      "username": "user9@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "89bb7379-75ce-4703-82e7-7880ac3df0dc",
      "obtained_via": "loot",
      "valid_for": [
        "89bb7379-75ce-4703-82e7-7880ac3df0dc"
      ]
    },
    {
      "cred_id": "6cc44653-e4b2-4a08-bbed-dcd86e9a626d",
      "username": "user15@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "ed36dbed-909b-4b1a-9c80-08eb774f6bc9",
      "obtained_via": "loot",
      "valid_for": [
        "ed36dbed-909b-4b1a-9c80-08eb774f6bc9"
      ]
    },
    {
      "cred_id": "cd751338-d870-46f5-8b83-5cec340a2816",
      "username": "user20@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "bc520f88-3439-4a83-9d61-82871e56e5c3",
      "obtained_via": "loot",
      "valid_for": [
        "bc520f88-3439-4a83-9d61-82871e56e5c3"
      ]
    },
    {
      "cred_id": "c272aa2c-ed0d-44bb-a341-768857b319a1",
      "username": "user22@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "70e7340c-207e-48c2-b8ea-52e83660ba87",
      "obtained_via": "loot",
      "valid_for": [
        "70e7340c-207e-48c2-b8ea-52e83660ba87"
      ]
    },
    {
      "cred_id": "efa5831e-5310-4e5a-8b3e-efdbb1232889",
      "username": "user23@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "c9c3f29c-e5df-482f-86fc-40e2bd18bfe0",
      "obtained_via": "loot",
      "valid_for": [
        "c9c3f29c-e5df-482f-86fc-40e2bd18bfe0"
      ]
    },
    {
      "cred_id": "8f7d70da-fdfd-4aad-82b5-13c98f23f827",
      "username": "user3@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "f9cf71c9-c4f1-4c81-bca1-25fbfb0a0787",
      "obtained_via": "loot",
      "valid_for": [
        "f9cf71c9-c4f1-4c81-bca1-25fbfb0a0787"
      ]
    },
    {
      "cred_id": "e2694c64-8816-4d19-8b08-54ec6490af57",
      "username": "user6@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "6942ce60-5f9f-4ed2-8efc-3aaaf790ae5d",
      "obtained_via": "loot",
      "valid_for": [
        "6942ce60-5f9f-4ed2-8efc-3aaaf790ae5d"
      ]
    },
    {
      "cred_id": "6e8fabd8-2bd4-4e56-9ee6-4d59c1df73a4",
      "username": "user7@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "f1138288-e8bd-4873-97b6-7de497b73a59",
      "obtained_via": "loot",
      "valid_for": [
        "f1138288-e8bd-4873-97b6-7de497b73a59"
      ]
    },
    {
      "cred_id": "e0fd0c27-11c6-4df2-8c21-244fe94047ca",
      "username": "user8@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "f7dbfe87-441b-4c5b-aaa2-0a0eba579265",
      "obtained_via": "loot",
      "valid_for": [
        "f7dbfe87-441b-4c5b-aaa2-0a0eba579265"
      ]
    },
    {
      "cred_id": "38b899de-a8a9-4566-b570-26d4876bf72c",
      "username": "user9@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "e9d2bc91-27c4-41e4-a554-6a19d5bfcd8d",
      "obtained_via": "loot",
      "valid_for": [
        "e9d2bc91-27c4-41e4-a554-6a19d5bfcd8d"
      ]
    },
    {
      "cred_id": "f7ef3676-564e-4f3b-a2c4-d26d6e3b76d3",
      "username": "user16@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "974a3d24-9f57-4518-98ee-cd79d1f5dcec",
      "obtained_via": "loot",
      "valid_for": [
        "974a3d24-9f57-4518-98ee-cd79d1f5dcec"
      ]
    },
    {
      "cred_id": "e48758f4-bb22-4f67-be5a-3045694c1755",
      "username": "user20@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "e7108fd1-ede6-4dfa-9069-d1a65762b706",
      "obtained_via": "loot",
      "valid_for": [
        "e7108fd1-ede6-4dfa-9069-d1a65762b706"
      ]
    },
    {
      "cred_id": "f80bfd85-b3b9-4996-9637-d03b2c0b730b",
      "username": "user21@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "adc33cfc-a0b8-420a-93c2-0479409a978c",
      "obtained_via": "loot",
      "valid_for": [
        "adc33cfc-a0b8-420a-93c2-0479409a978c"
      ]
    },
    {
      "cred_id": "2b415c7f-6a90-4b0a-91d4-03be59893602",
      "username": "user24@acme.local",
      "password": "hashed:NTLM:31d6cfe0d16ae931b73c59d7e0c089c0",
      "source_host": "132c128c-a097-48e6-8168-f8f134c07ee9",
      "obtained_via": "loot",
      "valid_for": [
        "132c128c-a097-48e6-8168-f8f134c07ee9"
      ]
    }
  ],
  "implants": [
    {
      "implant_id": "f648d9fb-56b3-476a-843c-cc72a688b325",
      "host_id": "2318b9a0-7e4f-4277-94ed-b2e31e799b11",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-06T17:57:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "4afbedd1-695e-4670-aa6c-8bbeb194bfc5",
      "host_id": "5732c795-1719-49af-bd24-54eac6b08743",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-03T11:20:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "25d56373-9a3b-4a8c-944e-ad8a6843af57",
      "host_id": "1346dff8-4d4b-46a7-9dfc-34926e4bc7db",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-12T00:40:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "a50e5c58-60b7-44ff-bc7b-90e13185dec0",
      "host_id": "3bab74e1-c19c-41aa-8d75-f2185c58995a",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-11T04:24:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "c3517f2e-1d32-40e5-bb8a-ec670d1b1586",
      "host_id": "89768f67-f318-408b-a899-3bb26185f373",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-04T07:21:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "4c1da54e-742c-43c4-b5f6-4712e08aefe1",
      "host_id": "d5a5631f-13fa-4cfd-bf18-35b92dc8cd38",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-05T00:28:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "6fb46394-ac7f-4d41-bd2b-56a477fb62f5",
      "host_id": "719c9a6f-2553-47b7-835b-6e5f4a75dd85",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-08T23:57:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "030418f8-2f33-4e84-b79b-d45baed25aa2",
      "host_id": "1d5ec44d-b206-4252-9a20-cf098e5b7e45",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-04T18:53:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "26d17901-1293-4319-aa7b-eefd26f84f13",
      "host_id": "d080433b-bd05-47bd-824f-cfc49cd71c6d",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-07T03:28:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "e70b31ea-1908-47a9-9acf-1b3bf0ec7377",
      "host_id": "da26f815-10a8-455e-9e9e-4b9359d2fc1c",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-05T05:02:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "a85a7954-39f5-40cd-94ee-d082254343b5",
      "host_id": "fb879aa1-4a23-4c9e-bbc6-87ca084eb88b",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-09T07:32:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "3c2f2cfa-3796-464d-b631-98b764fc3cf8",
      "host_id": "542f66f2-f1b1-4dc7-9d65-fea8bc1e3d38",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-11T13:00:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "d9b83299-c3ce-4e8d-8eca-e7a4b0e88a97",
      "host_id": "89bb7379-75ce-4703-82e7-7880ac3df0dc",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-09T03:11:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "d6caf0a3-c428-419c-a712-22e6eca0b14c",
      "host_id": "ed36dbed-909b-4b1a-9c80-08eb774f6bc9",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-10T18:48:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "a744c324-1993-4474-ac4c-7b9ad58948c1",
      "host_id": "bc520f88-3439-4a83-9d61-82871e56e5c3",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-10T21:47:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "aed5c774-0bb4-49c1-8e37-598fbcb43010",
      "host_id": "70e7340c-207e-48c2-b8ea-52e83660ba87",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-01T15:24:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "30aee6bb-c94e-484c-910c-ea694a3c5630",
      "host_id": "c9c3f29c-e5df-482f-86fc-40e2bd18bfe0",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-02T14:02:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "0d564445-ac3f-4a31-95da-68e6a82f3682",
      "host_id": "f9cf71c9-c4f1-4c81-bca1-25fbfb0a0787",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-04T04:49:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "a8b5232e-a16d-4e68-87a8-d3e03012816d",
      "host_id": "6942ce60-5f9f-4ed2-8efc-3aaaf790ae5d",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-07T09:12:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "3b55030a-e96d-453b-87a5-d267e72a5881",
      "host_id": "f1138288-e8bd-4873-97b6-7de497b73a59",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-04T19:19:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "6fc33020-497c-4108-be45-936c6b6e5476",
      "host_id": "f7dbfe87-441b-4c5b-aaa2-0a0eba579265",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-07T10:34:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "1b24cfb3-efc3-4748-86f6-2de5d3fb52d9",
      "host_id": "e9d2bc91-27c4-41e4-a554-6a19d5bfcd8d",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-08T17:59:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "bde436e8-4a4e-4903-b59f-5faf85f0ebf7",
      "host_id": "974a3d24-9f57-4518-98ee-cd79d1f5dcec",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-08T17:27:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "f47eea21-0f4f-4d87-84ad-ac1045f6568c",
      "host_id": "e7108fd1-ede6-4dfa-9069-d1a65762b706",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-08T23:34:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "5fcd6345-5eb0-4a28-b73f-9ffa6de595c4",
      "host_id": "adc33cfc-a0b8-420a-93c2-0479409a978c",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-05T07:23:00Z",
      "notes": "Autogenerated implant"
    },
    {
      "implant_id": "7cf4a223-89b0-48c9-a6f8-5ce1807160c6",
      "host_id": "132c128c-a097-48e6-8168-f8f134c07ee9",
      "implant_type": "meterpreter",
      "user": "NT AUTHORITY\\SYSTEM",
      "privilege": "SYSTEM",
      "started_at": "2025-05-02T17:42:00Z",
      "notes": "Autogenerated implant"
    }
  ]
}